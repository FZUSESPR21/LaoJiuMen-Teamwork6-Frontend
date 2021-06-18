<template>
  <div>
    <!--平时成绩占比选择-->
    <div class="dailypro">
      <p>请选择平时成绩占比</p>
      <el-radio v-model="radio" label="1">20%</el-radio>
      <el-radio v-model="radio" label="2">30%</el-radio>
    </div>

    <div id="dailytable">
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
    <el-button type="primary" plain size="mini" id="changebutton" @click="changeClick()">修改平时成绩占比</el-button>
  </div>
</template>

<script>
export default {
  name: "dailyscore",
  data() {
    return {
      //visible: false,
      formInline: {
        user: '',
        region: ''
      },
      options:[],
      tableCol: [
        //{label: "课堂表现得分规则/次"},
        //{prop: "id", label: "id"},
        {prop: "abs", label: "缺勤"},
        {prop: "leave", label: "请假"},
        {prop: "positivescore", label: "表现积极"},

        //{label: "小测得分规则/次"},
        //{prop: "id", label: "id"},
        {prop: "scoreA", label: "小测A100"},
        {prop: "scoreB", label: "小测B90-80"},
        {prop: "scoreC", label: "小测C70-30"},
        {prop: "scoreD", label: "小测D20-0"},
        {prop: "scoreF", label: "小测F缺交"},
        {prop: "scoreD", label: "小测D20-0"},

        //{label: "作业得分规则/次"},
        //{prop: "id", label: "id"},
        {prop: "homescore", label: "作业缺交"},

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
        localStorage.setItem('clazzvalue', this.value)
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
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/score/rules/search?clazzId='+ localStorage.getItem('clazzvalue'),
        }).then((response) => {          //这里使用了ES6的语法
          console.log(response.data.data.list)
          this.tableData = response.data.data.list
          this.totalCount = response.data.data.total
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },


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

#dailytable {

  font-weight: normal;
  margin-top: 3%;
  width:95%;
}

.button {
  background-color: white;
  color: #4ab2ee;
}

#changebutton{
  color: white;
  background-color: #4ab2ee;
  float: right;
  margin-top: 2%;
  margin-right: 3%;
}

#pagination{
  float: right;
  margin-top: 2%;
  margin-right: 4%;
}
</style>
