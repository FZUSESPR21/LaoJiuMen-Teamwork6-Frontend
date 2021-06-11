<template>
  <div id="divMain">
    <div id="divSelect">
      <span>班级：</span>
      <el-select size="mini"
                 v-model="value"
                 placeholder="请选择班级"
                 @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''">
        </el-option>
      </el-select>
    </div>

    <div>
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

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.type=='2'" type="text" size="mini" @click="editClick" class="button" icon="el-icon-edit">编辑</el-button>
            <el-button v-else type="text" size="mini" @click="downloadClick(scope.$index)" class="button" icon="el-icon-download">下载</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="deleteClick(scope.$index, scope.row)" class="button" icon="el-icon-delete">删除</el-button>
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
    </div>

    <div id="divAdd">
      <el-button type="primary" plain size="mini" @click="addClick" class="addbutton">新增</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "othersource",
  data() {
    return {
      options: [],
      value: '',


      tableCol: [
        {prop: "resourceName", label: "名称", width: 250},
        {prop: "downloads", label: "下载量", width: 250},

      ],

      tableData: [


      ],
      id: '',
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
      this.queryView(this.currentPage);
    },

    selectChange() {
      this.queryView(this.currentPage);
      localStorage.setItem('clazzvalue', this.value)
    },

    downloadClick(index) {
      this.id = this.tableData[index].id
      this.querySearch()

    },

    editClick() {
      this.$router.push({
        path: '/teacher/source/teachingplan',
        query: {

        }
      })
    },

    deleteClick(index,row) {
      this.id = row.id
      this.queryDelete()
      /*this.$router.push('/teacher/source/other')
      this.$router.go(0)*/
    },

    addClick() {
      this.$router.push({
        path: '/teacher/source/add',
        query: {
        }
      })
    },

    headeRowClass({row, column, rowIndex, columnIndex}){
      //表头的背景颜色
      if(rowIndex==0){
        return 'background:#DCDCDC; color: black';
      }
    },

    queryView(pageNum) {
      let info = {

      }
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/resource/other?clazzId=' + this.value +'&pn='+pageNum,
      }).then((response) => {          //这里使用了ES6的语法
        /*console.log(JSON.stringify(response))       //请求成功返回的数据
        alert(JSON.stringify(response))
        alert("成功")
        console.log(response.data.data.list)*/
        this.tableData = response.data.data.list
        this.totalCount = response.data.data.total
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    querySearch() {
      window.location.href = 'http://1.15.149.222:8080/coursewebsite/resource/download?id='+this.id;

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
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/resource/delete',
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
    this.value = this.options[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.value)
    else this.value = localStorage.getItem('clazzvalue')
    this.queryView(this.currentPage);
  }

}
</script>

<style scoped>
#divSelect {
  float: right;
}

.button {
  background-color: white;
  color: #4ab2ee;
}

.addbutton {
  color: white;
  background-color: #4ab2ee;
}

#divAdd{
  float: right;
  clear: left;
}
</style>
