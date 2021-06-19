<template>
  <div>
  <el-form :inline="true" :model="formInline" class="score-rule">
    班级：
    <el-select v-model="clazzvalue" placeholder="请选择" size="mini" @change="changeClazz">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.clazzName"
        :value="item.id+''">
      </el-option>
    </el-select>
    <el-button type="primary" size="mini" @click="toInput">成绩录入</el-button>
    <el-button type="primary" size="mini" @click="toAnalysis">成绩分析</el-button>
  </el-form>
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
  name: "resultlist",
  data() {
    return {
      formInline: {
      user: '',
      region: ''
      },
      tableCol: [
        {prop: "account", label: "学号", },
        {prop: "studentName", label: "姓名", },
        {prop: "usualScore", label: "平时成绩", },
        {prop: "writtenScore", label: "笔试成绩", },
        {prop: "totalScore", label: "最终成绩", },

      ],
      options:[],
      clazzvalue:'',
      tableData: [],
      pagesize: 5,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 1,
      //搜索条件
      criteria: '',
      itemKey:''
    }
  },
  methods: {
    headeRowClass({row, column, rowIndex, columnIndex}){
      //表头的背景颜色
      if(rowIndex==0){
        return 'background:#e8e8e8; color: black';
      }
    },

    toInput(){
      this.$router.push('/teacher/result/resultinput')
    },
    toAnalysis(){
      this.$router.push('/teacher/result/taskanalysis')
    },
    changeClazz() {
      this.scorelistSearch(this.currentPage);
      localStorage.setItem('clazzvalue', this.clazzvalue)
      // this.$router.go(0)
    },
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.scorelistSearch(this.currentPage);
    },

    scorelistSearch(pageNum) {

        this.$axios({
          method: 'get',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/score/all?clazzId='+this.clazzvalue+'&pn='+pageNum ,
        }).then((response) => {          //这里使用了ES6的语法
          /*console.log(JSON.stringify(response))       //请求成功返回的数据
          alert(JSON.stringify(response))
          alert("成功")*/

          console.log(response.data.data.list)
          this.tableData = response.data.data.list
          // this.itemKey = Math.random()

          this.totalCount = response.data.data.total
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
    },

    created(){
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.clazzvalue = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.clazzvalue)
      else this.clazzvalue = localStorage.getItem('clazzvalue')
      this.scorelistSearch(this.currentPage);
    }
}
</script>


<style scoped>
#pagination{
  float: right;
  margin-top: 2%;
}

.score-rule{
  float: right;
  margin-right: 2%;
  margin-top: -40px
}

</style>

