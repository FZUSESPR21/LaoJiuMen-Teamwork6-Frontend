<template>
  <div id="div1">
    <div id="divDetail">
      <i class="el-icon-document"></i>
      <sapn id="tag">作业详情</sapn>
      <el-table id="table1"
                :data="tableData"
                style="width: 100%;"
                :row-style="{height:'100px'}"
                :show-header="status"
                border>
        <el-table-column
          v-for="(item,i) in tableCol"
          :key="i"
          :prop="item.prop"
          :width="item.width">
        </el-table-column>
      </el-table>
    </div>

    <br>

    <div>
      <i class="el-icon-finished"></i>
      <sapn id="tag">提交列表</sapn>
      <el-table id="table"
                :data="tableData2"
                stripe
                style="width: 100%"
                :header-cell-style="headeRowClass"
                :cell-style="cellStyle">
        <el-table-column
          v-for="(item,i) in tableCol2"
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>

        <el-table-column label="作业详情" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="lookClick(scope.row)" class="button" icon="el-icon-view">查看</el-button>
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
  </div>
</template>

<script>

export default {
  name: "homeworkdetail",
  data() {
    return {
      status: false,

      tableCol: [
        {prop: "key", label: "键"},
        {prop: "value", label: "值"},

      ],

      tableData: [
        {key: "标题：", value: this.$route.query.name},
        {key: "截止时间：", value: this.$route.query.endDate},
        {key: "作业内容：", value: this.$route.query.content},

      ],

      tableCol2: [
        {prop: "account", label: "学号"},
        {prop: "studentName", label: "姓名"},
        {prop: "submittedAt", label: "提交时间"},
        {prop: "score", label: "提交情况"},

      ],

      tableData2: [

      ],

      hwId: this.$route.query.hwId,
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
      this.queryResult(this.currentPage);
    },

    lookClick(row) {
      this.$router.push({
        path: '/teacher/activity/submittedhomeworkdetail',
        query: {
          remark: row.remark,
          content: row.content,
          id: row.id,
          hwId: this.hwId,
          filepath: row.filePath

        }
      })
    },

    headeRowClass({row, column, rowIndex, columnIndex}){
      //表头的背景颜色
      if(rowIndex==0){
        return 'background:#e8e8e8; color: black';
      }
    },

    cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
      // console.log(row);
      // console.log(row.column);
      if(row.column.label === "提交情况"&&row.row.score==="未提交"){
        return 'color:red'
      }
    },

    queryResult(pageNum) {
      let info = {

      }

      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework_result/all_sub?homeworkId=' + this.hwId +'&pn='+pageNum,
      }).then((response) => {          //这里使用了ES6的语法
        // console.log(JSON.stringify(response))       //请求成功返回的数据

        this.tableData2 = response.data.data.list
        this.totalCount = response.data.data.total
        console.log(this.tableData2)
        for (var i = 0; i < this.totalCount;i++) {
          if(this.tableData2[i].score === -2) {
            this.tableData2[i].score = '未提交'
          } else if (this.tableData2[i].score === -1) {
            this.tableData2[i].score = '未批改'
          }
        }
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    }


  },

  created() {
    this.queryResult(this.currentPage);
  }

}
</script>

<style scoped>
#divDetail {
  margin-top: -3%;
}

#table {
  margin-top: 2%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#table1 {
  margin-top: 2%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#tag {
  font-weight:bold;
  color: #000000;
  background-color: white;
}

#div1 {
  margin-top: 3%;
  background-color: white;
}

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
