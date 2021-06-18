<template>
  <div>
    <el-table id="el-table"
              :data="tableData"
              style="width: 100%"
              :header-cell-style="headeRowClass">
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="lookClick(scope.$index,scope.row)" class="button" icon="el-icon-view">查看</el-button>
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
</template>

<script>
export default {
  name: "submittedhomeworklist",
  data() {
    return {

      tableCol: [
        {prop: "title", label: "作业名称"},
        {prop: "score", label: "得分"},

      ],

      tableData: [

      ],

      sId: localStorage.id,
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

  created() {
    this.querySearch(this.currentPage);
  },

  methods: {
    //页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.querySearch(this.currentPage);
    },

    lookClick(index,row) {
      console.log(this.tableData[index].content)
      this.$router.push({
        path: '/student/activity/submittedhomeworkdetail',
        query: {
          content: this.tableData[index].content,
          remark: this.tableData[index].remark,

          id: this.tableData[index].id,
          filepath: this.tableData[index].filePath,

          title: this.tableData[index].title,
          homeworkContent: this.tableData[index].homeworkContent,

        }
      })
      console.log(this.tableData[index].filePath)
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
          url: 'http://1.15.149.222:8080/coursewebsite/student/homework_result/all?studentId=' + this.sId +'&pn='+pageNum,
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
  },

}
</script>

<style scoped>
.button {
  background-color: white;
  color: #4ab2ee;
  border: 2px
}

#pagination{
  float: right;
  margin-top: 2%;
}
</style>
