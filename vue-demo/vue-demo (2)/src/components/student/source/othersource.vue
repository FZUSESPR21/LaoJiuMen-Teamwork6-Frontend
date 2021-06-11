<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%"
              stripe
              :header-cell-style="headeRowClass">
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
      ></el-table-column>

<!--      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="lookClick" class="button" icon="el-icon-view">查看</el-button>
        </template>
      </el-table-column>-->

      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="downloadClick(scope.$index)" class="button" icon="el-icon-download">下载</el-button>
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
  name: "studysource",
  data() {
    return {
      tableCol: [
        {prop: "resourceName", label: "名称", width: 300},
        {prop: "downloads", label: "下载量", width: 300},

      ],

      tableData: [

      ],

      cId: localStorage.clazzId,
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
    };
  },
  methods: {
    //页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.queryView(this.currentPage);
    },

    headeRowClass({row, column, rowIndex, columnIndex}){
      //表头的背景颜色
      if(rowIndex==0){
        return 'background:#DCDCDC; color: black';
      }
    },


    downloadClick(index) {
      this.id = this.tableData[index].id
      this.querySearch()
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
        url: 'http://1.15.149.222:8080/coursewebsite/resource/other?clazzId=' + this.cId +'&pn='+pageNum,
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
  },
  created() {
    this.queryView(this.currentPage);
  }
}
</script>

<style scoped>
.button {
  background-color: white;
  color: #4ab2ee;
  border: 2px
}
</style>
