<template>
  <div>
    <!--平时成绩占比选择-->
    <div class="dailypro">
      <p>请选择平时成绩占比</p>
      <el-radio v-model="radio" label="20">20%</el-radio>
      <el-radio v-model="radio" label="30">30%</el-radio>
    </div>

    <div id="dailytable">
      <el-table :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="headeRowClass">
        <el-table-column
          prop="absentScore"
          label="缺勤">
          <template slot-scope="scope">
            <el-input v-model="rules.absentScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="performanceScore"
          label="表现积极">
          <template slot-scope="scope">
            <el-input v-model="rules.performanceScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="quizAScore"
          label="小测A100">
          <template slot-scope="scope">
            <el-input v-model="rules.quizAScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="quizBScore"
          label="小测B90-80">
          <template slot-scope="scope">
            <el-input v-model="rules.quizBScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="quizCScore"
          label="小测C70-30">
          <template slot-scope="scope">
            <el-input v-model="rules.quizCScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="quizDScore"
          label="小测D20-0">
          <template slot-scope="scope">
            <el-input v-model="rules.quizDScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="quizEScore"
          label="小测E缺交">
          <template slot-scope="scope">
            <el-input v-model="rules.quizEScore" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="notSubmittedScore"
          label="作业缺交">
          <template slot-scope="scope">
            <el-input v-model="rules.notSubmittedScore" ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>

   <el-button type="primary" plain size="mini" id="changebutton" @click="updateRules()">修改平时成绩占比</el-button>
  </div>
</template>

<script>
export default {
  name: "dailyscore",
  data() {
    return {
      //visible: false,
      rules: {
        absentScore:'',
        performanceScore:'',
        quizAScore:'',
        quizBScore:'',
        quizCScore:'',
        quizDScore:'',
        quizEScore:'',
        notSubmittedScore:''
      },
      formInline: {
        user: '',
        region: ''
      },
      //options:[],
      tableCol: [
        //{label: "课堂表现得分规则/次"},
        //{prop: "id", label: "id"},
        {prop: "absentScore", label: "缺勤"},
       // {prop: "leave", label: "请假"},
        {prop: "performanceScore", label: "表现积极"},

        //{label: "小测得分规则/次"},
        //{prop: "id", label: "id"},
        {prop: "quizAScore", label: "小测A100"},
        {prop: "quizBScore", label: "小测B90-80"},
        {prop: "quizCScore", label: "小测C70-30"},
        {prop: "quizDScore", label: "小测D20-0"},
        {prop: "quizEScore", label: "小测E缺交"},

        //{label: "作业得分规则/次"},
        //{prop: "id", label: "id"},
        {prop: "notSubmittedScore", label: "作业缺交"},

      ],

      value:'',
      tableData: [

      ],


      radio: '',
    };
  },
    methods: {
      headeRowClass({row, column, rowIndex, columnIndex}){
        //表头的背景颜色
        if(rowIndex==0){
          return 'background:#e8e8e8; color: black';
        }
      },

      querySearch() {
        let info = {

        }

        this.$axios({
          method: 'get',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(info),
          url: 'http://1.15.149.222:8080/coursewebsite/score/rules/search?cid='+ this.value,
        }).then((response) => {          //这里使用了ES6的语法
          this.tableData = [response.data.data]
          this.radio = response.data.data.usualScoreProportion + ''
          this.rules = response.data.data
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      updateRules() {
        let newRules = {
          id:localStorage.getItem('clazzvalue'),
          usualScoreProportion:this.radio,
          absentScore:this.rules.absentScore,
          performanceScore:this.rules.performanceScore,
          quizAScore:this.rules.quizAScore,
          quizBScore:this.rules.quizBScore,
          quizCScore:this.rules.quizCScore,
          quizDScore:this.rules.quizDScore,
          quizEScore:this.rules.quizEScore,
          notSubmittedScore:this.rules.notSubmittedScore
        }

        this.$axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(newRules),
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/score/rules/update',
        }).then((response) => {          //这里使用了ES6的语法
          console.log(response)
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },

    },

    created () {
      this.value = localStorage.getItem('clazzvalue')
      this.querySearch();
    }
  };
</script>


<style scoped>
#dailytable {
  margin-top: 3%;
  width:95%;
}
</style>
