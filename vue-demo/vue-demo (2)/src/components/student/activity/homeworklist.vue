<template>
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
    name: "homeworklist",
    data() {
      return {
        tableCol: [
          {prop: "title", label: "作业名称"},
          {prop: "startAt", label: "开始时间"},
          {prop: "endAt", label: "结束时间"},
          {prop: "status", label: "状态"},
          {prop: "score", label: "得分"},

        ],

        tableData: [

        ],

        cId: localStorage.clazzId,
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
    methods: {
      //页码变更
      handleCurrentChange: function(val) {
        this.currentPage = val;
        this.querySearch(this.currentPage);
      },

      lookClick(index,row) {

        this.$router.push({
          path: '/student/activity/homeworkdetail',
          query: {
            hwId: row.id,
            stuId: this.sId,
            name: row.title,
            endDate: row.endAt,
            content: this.tableData[index].content
          }
        })
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
          url: 'http://1.15.149.222:8080/coursewebsite/student/homework/all?clazzId=' + this.cId + '&studentId=' + this.sId +'&pn='+pageNum,
        }).then((response) => {          //这里使用了ES6的语法
          /*console.log(JSON.stringify(response))       //请求成功返回的数据
          alert(JSON.stringify(response))
          alert("成功")*/

          console.log(response.data.data.list)
          this.tableData = response.data.data.list
          this.totalCount = response.data.data.total
          for (var i = 0; i < this.totalCount;i++) {
            if(this.tableData[i].score === -2) {
              this.tableData[i].score = '未提交'
            } else if (this.tableData[i].score === -1) {
              this.tableData[i].score = '未批改'
            }
          }

        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })

      },

    },

    created () {
      this.querySearch(this.currentPage);
    }
  };
</script>

<style scoped>
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
