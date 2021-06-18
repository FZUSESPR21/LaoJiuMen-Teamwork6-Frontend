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

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="160"
            v-model="visible"
            :ref="`popover-${scope.$index}`">
            <p>确定下载该资源吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelBtn(scope)">取消</el-button>
              <el-button type="primary" size="mini" @click="downloadClick(scope.$index,scope.row),cancelBtn(scope)">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="text" id="downloadbutton" icon="el-icon-download">下载</el-button>
          </el-popover>

<!--          <el-button size="mini" type="text" @click="downloadClick(scope.$index,scope.row)" class="button" icon="el-icon-download">下载</el-button>-->
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
        {prop: "resourceName", label: "名称"},
        {prop: "downloads", label: "下载量"},

      ],

      tableData: [

      ],

      cId: localStorage.clazzId,
      id: '',
      name: '',
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
        return 'background:#e8e8e8; color: black';
      }
    },

    downloadClick(index,row) {
      this.id = this.tableData[index].id
      this.name = row.resourceName
      this.queryDownload()
    },

    cancelBtn (scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose()
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
        this.tableData = response.data.data.list
        this.totalCount = response.data.data.total
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    queryDownload() {
      fetch('http://1.15.149.222:8080/coursewebsite/resource/download?id='+this.id, {
        method: 'GET',
        headers: new Headers({
          //自己加的头信息全都要转成string
          'Content-type': 'application/json;charset=UTF-8',
          'Authorization': localStorage.getItem('token')

        }),
      })
        .then(res => res.blob())
        .then(data => {
          const blobUrl = window.URL.createObjectURL(data);
          this.download2(blobUrl);
        });
    },
    //模拟a标签实现下载excel文件
    download2(blobUrl) {
      const a = document.createElement('a');
      a.download = this.name;
      a.href = blobUrl;
      a.click();
    },

    /*querySearch() {
      window.location.href = 'http://1.15.149.222:8080/coursewebsite/resource/download?id='+this.id;

    },*/
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

#pagination{
  float: right;
  margin-top: 2%;
}
</style>
