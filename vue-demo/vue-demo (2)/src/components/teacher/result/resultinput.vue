<template>
  <div>
      <!--上传学生成绩excel-->
    <div class="rinput">
      <div id="divP">
        <p id="topP">下载Excel录入成绩</p>
      </div>

      <input class="file" name="file_excel" type="file"  @change="select"/>
      <el-button size="mini" id="uploadbtn" icon="el-icon-upload2">上传Excel录入成绩</el-button>
      <el-button size="small" type="primary" @click="queryDownload">下载文件</el-button>
    </div>

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

    <el-button type="primary" plain size="mini" class="button" @click="updateRules()">修改平时成绩占比</el-button>


    <div id="div2">
      <div class="divP2">
        <p class="p2">录入单个学生成绩</p>
      </div>

      <div id="inputsingle">
        <el-form ref="formStu" :model="formStu" id="formStu">
          <el-form-item label="学号" prop="account">
            <el-input class="input" v-model="formStu.account" placeholder="请输入学号"></el-input>
          </el-form-item>

          <el-form-item label="期末笔试成绩" prop="writtenScore">
            <el-input class="input" v-model="formStu.writtenScore" placeholder=""></el-input>
          </el-form-item>

<!--          <el-form-item label="总分" prop="totalScore">
            <el-input class="input" v-model="formStu.totalScore" placeholder=""></el-input>
          </el-form-item>-->
        </el-form>

        <el-form ref="form" :model="formPre" id="formPre">
          <el-form-item label="缺勤次数" prop="absence">
            <el-input class="input" v-model="formPre.absence" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="表现积极次数" prop="positive">
            <el-input class="input" v-model="formPre.positive" placeholder=""></el-input>
          </el-form-item>
        </el-form>

        <el-form ref="formTest" :model="formTest" id="formTest">
          <el-form-item label="小测获得A" prop="getA">
            <el-input class="input" v-model="formTest.getA" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="小测获得B" prop="getB">
            <el-input class="input" v-model="formTest.getB" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="小测获得C" prop="getC">
            <el-input class="input" v-model="formTest.getC" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="小测获得D" prop="getD">
            <el-input class="input" v-model="formTest.getD" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="小测获得E" prop="getE">
            <el-input class="input" v-model="formTest.getE" placeholder=""></el-input>
          </el-form-item>
        </el-form>

        <el-form ref="formHw" :model="formHw" id="formHw">
          <el-form-item label="作业最终分数" prop="homeworkScore">
            <el-input class="input" v-model="formHw.homeworkScore" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="作业缺交次数" prop="homeworkMiss">
            <el-input class="input" v-model="formHw.homeworkMiss" placeholder=""></el-input>
          </el-form-item>
        </el-form>

        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <p>确定录入吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="onSubmit('form'), visible=false">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" plain size="mini" class="button">上传</el-button>
        </el-popover>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "resultinput",
  data() {
    return {
      visible: false,
      input1: '',
      fileList: [{name: '', url: ''}],//已上传的文件

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

      formStu: {
        account: '',
        writtenScore: '',
        totalScore: ''
      },

      formPre: {
        absence: '',
        positive: '',
      },

      formTest: {
        getA: '',
        getB: '',
        getC: '',
        getD: '',
        getE: '',
      },

      formHw: {
        homeworkScore: '',
        homeworkMiss: '',
      },

      clazzId:'',
      radio: '',
    }
  },

  created () {
    this.clazzId = localStorage.getItem('clazzvalue')
    this.querySearch();
  },

  methods: {
    headeRowClass({row, column, rowIndex, columnIndex}){
      //表头的背景颜色
      if(rowIndex==0){
        return 'background:#e8e8e8; color: black';
      }
    },

    querySearch() {
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/score/rules/search?cid='+ this.clazzId,
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

    queryDownload() {
      fetch('http://1.15.149.222:8080/coursewebsite/teacher/score/down?clazzId=' + this.clazzId, {
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
      a.download = "成绩录入格式.xlsx";
      a.href = blobUrl;
      a.click();
    },

    /*downTemplate () {
        window.location.href = 'http://1.15.149.222:8080/coursewebsite/teacher/score/down?clazzId='+localStorage.getItem('clazzvalue')*/

    select(e) {

      this.file = e.target.files[0]
      // console.log(file)
      let param = new FormData() // 创建form对象
      param.append('file_excel', this.file, this.file.name) // 通过append向form对象添加数据
      // withCredentials: true 使得后台可以接收表单数据  跨域请求
      const instance = this.$axios.create({
        withCredentials: true,
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          'Authorization': localStorage.getItem('token')
        }
      })
      // url为后台接口
      instance.post('http://1.15.149.222:8080/coursewebsite/teacher/score/excel', param)
        .then((response) => {
          console.log(response.data)

          if (response.data.code === '200') {
            alert('上传成功')
            this.$router.push('/teacher/result/resultlist')
            this.$router.go(0)

          }
        }) // 成功返回信息 调用函数  函数需自己定义，此处后面省略
        .catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
    },

    onSubmit() {
      let us = parseInt(this.formTest.getA) * parseInt(this.rules.quizAScore) +
        parseInt(this.formTest.getB) * parseInt(this.rules.quizBScore) +
        parseInt(this.formTest.getC) * parseInt(this.rules.quizCScore) +
        parseInt(this.formTest.getD) * parseInt(this.rules.quizDScore) +
        parseInt(this.formTest.getE) * parseInt(this.rules.quizEScore) +
        parseInt(this.formPre.absence) * parseInt(this.rules.absentScore) +
        parseInt(this.formPre.positive) * parseInt(this.rules.performanceScore) +
        parseInt(this.formHw.homeworkMiss) * parseInt(this.rules.notSubmittedScore) +
        parseInt(this.formHw.homeworkScore)
      us = us < parseInt(this.radio) ? us : parseInt(this.radio)
      let info = {
        account: this.formStu.account,
        // totalScore: parseInt(this.formStu.totalScore),
        totalScore: parseInt(parseInt(this.formStu.writtenScore) * (1 - 0.01 * parseInt(this.radio)) + us),
        writtenScore: parseInt(this.formStu.writtenScore),
        usualScore: us
      }
      alert("该生总成绩为：" + info.totalScore + "\r\n卷面成绩为：" + info.writtenScore + "\r\n平时成绩为：" + info.usualScore)
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/score/update',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(JSON.stringify(response.data.data))       //请求成功返回的数据
        if (response.data.code==='200') {
          alert('上传成功')
        }
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
        this.tipBox = true
      })
    }
  }
}
</script>


<style scoped>
#uploadbtn{
  display: inline;
  margin-left: -178px;
  margin-right: 10px;
}
.file {
  position: relative;
  display: inline-block;
  width: 175px;
  height: 28px;
  margin-left: 15px;
  opacity: 0;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}

#inputsingle {
  margin-left: 2%;

}

.input {
  width: 50%;
}

#divP {
  background-color: #e8e8e8;
}
#topP {
  padding-top: 1%;
  padding-bottom: 1%;
}

.rinput {
  margin-bottom: 5%;
}

.button {
  margin-top: 1%;
  color: white;
  background-color: #4ab2ee;
}

</style>
