<template>
  <div id="divMain">
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
          :value="item.id+''">
        </el-option>
      </el-select>
    </div>

    <div>
      <el-table id="table"
                :data="tableData"
                stripe
                width="100%"
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
            <el-popover
              placement="top"
              width="160"
              v-model="visible"
              :ref="`popover1-${scope.$index}`">
              <p>确定下载该资源吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelBtn1(scope)">取消</el-button>
                <el-button type="primary" size="mini" @click="downloadClick(scope.$index,scope.row),cancelBtn1(scope)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="text" class="button" icon="el-icon-download">下载</el-button>
            </el-popover>

<!--            <el-button size="mini" type="text" @click="downloadClick(scope.$index,scope.row)" class="button" icon="el-icon-download">下载</el-button>-->
            <el-popover
              placement="top"
              width="160"
              v-model="visible"
              :ref="`popover-${scope.$index}`">
              <p>确定删除该资源吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelBtn(scope)">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteClick(scope.$index,scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="text" class="button" icon="el-icon-delete">删除</el-button>
            </el-popover>
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
  name: "studysource",
  data() {
    return {
      options: [],
      value: '',

      tableCol: [
        {prop: "resourceName", label: "名称"},
        {prop: "downloads", label: "下载量"},

      ],

      tableData: [

      ],

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

    downloadClick(index,row) {
      this.id = this.tableData[index].id
      this.name = row.resourceName
      this.queryDownload()

    },

    deleteClick(index,row) {
      this.id=row.id
      this.queryDelete()
      /*this.$router.push('/teacher/source/study')
      this.$router.go(0)*/
    },

    cancelBtn (scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },

    cancelBtn1 (scope) {
      scope._self.$refs[`popover1-${scope.$index}`].doClose()
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
        return 'background:#e8e8e8; color: black';
      }
    },

    queryView(pageNum) {
      let info = {

      }

      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          'Authorization': localStorage.getItem('token')
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/resource/all?clazzId=' + this.value +'&pn='+pageNum,
      }).then((response) => {

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
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/resource/delete',
      }).then((response) => {          //这里使用了ES6的语法
        if (response.data.code==='200') {
          alert('删除成功')
          this.$router.push('/teacher/source/study')
          this.$router.go(0)
        }
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    queryDownload() {
      fetch('http://1.15.149.222:8080/coursewebsite/resource/download?id=' + this.id, {
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

    /*queryDownload() {
      window.location.href = 'http://1.15.149.222:8080/coursewebsite/resource/download?id='+this.id;

    },*/
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
#divMain {
  background-color: white;
}

#divSelect {
  float: right;
  margin-right: 2%;
  margin-top: -40px
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
  margin-right: 3%;
  margin-top: 2%;
}

#pagination{
  float: right;
  margin-top: 2%;
}
</style>
