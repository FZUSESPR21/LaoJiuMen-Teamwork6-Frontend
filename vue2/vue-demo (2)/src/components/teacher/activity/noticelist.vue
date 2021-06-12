<template>
  <div>
    <div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="班级">
      <el-select size="mini" v-model="formInline.region" placeholder="请选择年份班级" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="resultbutton"></el-form-item>
  </el-form>
    </div>
  <el-table id="table"
              :data="tableData"
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

      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="lookClick(scope.$index,scope.row)" class="button" icon="el-icon-view">查看</el-button>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" width="80">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" type="text" @click="lookClick(scope.$index,scope.row)" class="button" icon="el-icon-view">修改</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="deleteClick(scope.$index, scope.row)" class="button" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      id="pagination"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
    <el-button type="primary" @click="deliverClick()">发布通知</el-button>

</div>
</template>

<script>
export default {
  name: "noticelist",
  data() {
    return {
      formInline: {
      user: '',
      region: ''
      },
      options:[],
      tableCol: [
        {prop: "id", label: "id", width: 80},
        {prop: "notificationName", label: "通知名称", width: 100},
        {prop: "content", label: "通知内容", width: 150},
        {prop: "issuer", label: "发布人", width: 80},
        {prop: "releasedAt", label: "发布时间", width: 200},

      ],

      tableData: [

      ],

      nId: '1',
      nname: '',
      content: '',
      pagesize: 5,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 1,
      //搜索条件
      criteria: '',
    };
  },
    methods: {
      //页码变更
      handleCurrentChange: function(val) {
        this.currentPage = val;
        this.querySearch(this.currentPage);
      },

      selectChange() {
        this.querySearch(this.currentPage);
        localStorage.setItem('clazzvalue', this.formInline.region)
      },

      deliverClick(){
        this.$router.push({
          path:'/teacher/activity/noticedeliver'
        }
        )

      },
      deleteClick(index,row) {
        this.id = row.id
        this.queryDelete()
      },
      lookClick(index,row) {

        this.$router.push({
          path: '/teacher/activity/noticedetail',
          query: {
            nId: row.id,
            nname: row.notificationName,
            content: this.tableData[index].content
          }
        })
      },

      headeRowClass({row, column, rowIndex, columnIndex}){
        //表头的背景颜色
        if(rowIndex==0){
          return 'background:#DCDCDC; color: black';
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
          url: 'http://1.15.149.222:8080/coursewebsite/notice/all?clazzId='+this.formInline.region +'&pn='+pageNum,
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
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/notice/remove',
        }).then((response) => {          //这里使用了ES6的语法
          /*console.log(JSON.stringify(response))       //请求成功返回的数据
          alert(JSON.stringify(response))
          alert("成功")
          console.log(response.data.data.list)
          this.tableData = response.data.data.list*/
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
    }
      },


    created () {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.formInline.region = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.formInline.region)
      else this.formInline.region = localStorage.getItem('clazzvalue')
      this.querySearch(this.currentPage);
    }
  };



</script>


<style scoped>
#head{
  background-color: white;
  font-size: 20px;
  height: 100px;
}
.demo-form-inline{
  margin-top:5%;
}
.resultbutton{
  float:right;
}
</style>




<style scoped>
#head{
  background-color: white;
  font-size: 20px;
  height: 100px;
  margin-top: 8%;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  margin-top: -4%;
  background-color: rgb(228, 228, 228);
}
</style>
