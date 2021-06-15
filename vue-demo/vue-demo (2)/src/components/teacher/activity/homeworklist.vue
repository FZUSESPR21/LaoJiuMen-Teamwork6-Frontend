<template>
  <div>
    <div id="divSelect">
      班级：
      <el-select size="mini"
                 v-model="value"
                 placeholder="请选择班级"
                 @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''"
        >
        </el-option>
      </el-select>
    </div>

    <div id="table">
      <el-table :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="headeRowClass">
        <el-table-column
          v-for="(item,i) in tableCol"
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="lookClick(scope.$index,scope.row)" class="button" icon="el-icon-view">查看</el-button>
            <el-popover
              placement="top"
              width="160"
              v-model="visible"
              :ref="`popover-${scope.$index}`">
              <p>确定删除该作业吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelBtn(scope)">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteClick(scope.$index,scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="text"  class="button" icon="el-icon-delete">删除</el-button>
            </el-popover>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      id="pagination"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: "homeworklist",
    data() {
      return {
        //visible: false,
        options: [],
        value: '',

        tableCol: [
          {prop: "title", label: "作业名称"},
          {prop: "startAt", label: "开始时间"},
          {prop: "endAt", label: "结束时间"},
          {prop: "status", label: "状态"},

        ],

        tableData: [

        ],

        tId: localStorage.id,
        pagesize: 5,
        //当前页码
        currentPage: 1,
        //查询的页码
        start: 1,
        //默认数据总数
        totalCount: 1,
        //搜索条件
        criteria: '',
      }
    },
    methods: {
      //页码变更
      handleCurrentChange: function(val) {
        this.currentPage = val;
        this.querySearch(this.currentPage);
      },

      selectChange() {
        this.querySearch(this.currentPage);
        localStorage.setItem('clazzvalue', this.value)
      },

      lookClick(index,row) {
        this.$router.push({
          path: '/teacher/activity/homeworkdetail',
          query: {
            hwId: row.id,
            name: row.title,
            endDate: row.endAt,
            content: this.tableData[index].content
          }
        })
      },

      deleteClick(index,row) {
        this.id = row.id
        this.queryDelete()
        /*this.$router.push('/teacher/activity/homeworklist')
        this.$router.go(0)*/
      },

      cancelBtn (scope) {
        scope._self.$refs[`popover-${scope.$index}`].doClose()
      },

      headeRowClass({row, column, rowIndex, columnIndex}){
        //表头的背景颜色
        if(rowIndex==0){
          return 'background:#e8e8e8; color: black';
        }
      },


      querySearch(pageNum) {
        let info = {

        }

        this.$axios({
          method: 'get',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(info),
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework/all?clazzId=' + this.value +'&pn='+pageNum ,
        }).then((response) => {          //这里使用了ES6的语法
          /*console.log(JSON.stringify(response))       //请求成功返回的数据
          alert(JSON.stringify(response))
          alert("成功")*/

          console.log(response.data.data.list)
          this.tableData = response.data.data.list
          this.totalCount = response.data.data.total
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },

      queryDelete() {
        let info = {
          id: this.id
        }

        this.$axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(info),
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework/delete',
        }).then((response) => {          //这里使用了ES6的语法

          if (response.data.code==='200') {
            alert('删除成功')
            this.$router.push('/teacher/activity/homeworklist')
            this.$router.go(0)

          }
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      }
    },

    created () {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.value = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.value)
      else this.value = localStorage.getItem('clazzvalue')
      this.querySearch(this.currentPage);
    }
  };
</script>

<style scoped>
#divSelect {
  float: right;
  margin-right: 2%;
  margin-top: -40px
}

#table {

  font-weight: normal;
}

.button {
  background-color: white;
  color: #4ab2ee;
}

#pagination{
  float: right;
  margin-top: 2%;
}
</style>
