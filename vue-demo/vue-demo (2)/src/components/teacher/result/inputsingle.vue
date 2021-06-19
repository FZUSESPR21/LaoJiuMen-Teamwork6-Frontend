<template>
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

        <el-form-item label="总分" prop="totalScore">
          <el-input class="input" v-model="formStu.totalScore" placeholder=""></el-input>
        </el-form-item>
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
</template>

<script>
  export default {
    name: "inputsingle",
    data() {

      return {
        visible: false,
        options: [],

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

        clazzId: '',
      }
    },

    created() {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.clazzId = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.clazzId)
      else this.clazzId = localStorage.getItem('clazzvalue')
    },

    methods: {
      onSubmit(formName) {
        console.log('submit!');
        let info = {
          account: this.formStu.account,
          totalScore: parseInt(this.formStu.totalScore),
          writtenScore: parseInt(this.formStu.writtenScore),
          usualScore: 0
        }

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

    },
}
</script>

<style scoped>
#div2 {
  background-color: white;
  margin-top: -3%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

.divP2 {
  background-color: #e8e8e8;
  height:100%;
}

.p2 {
  font-size: 20px;
  font-weight: bold;
  margin-left: 2%;
  padding-top:2%;
  padding-bottom:2%;
}

.button{
  background-color: #4ab2ee;
  color:white;
  float: right;
  margin-bottom: 2%;
}

#inputsingle {
  margin-left: 2%;
  margin-right: 2%;

}

.input {
  width: 20%;
}


</style>
