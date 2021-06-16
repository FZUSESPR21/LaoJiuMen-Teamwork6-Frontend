<template>
  <div id="div2">
    <div class="divP2">
      <p class="p2">录入单个学生成绩</p>
    </div>
    <div class="textitem2">
      <div id="inputsingle">
        <div id="inputsinglehead"></div>

          <el-form ref="form" :model="form" :rules="rules" label-width="80px" id="inputform">

            <el-form-item label="学号" prop="number">
              <el-input v-model="form.number" placeholder="请输入学号"></el-input>
            </el-form-item>

            <el-form-item label="缺勤次数" prop="absence">
              <el-input v-model="form.account" placeholder="请输入缺勤次数"></el-input>
            </el-form-item>
            
            <el-form-item label="表现积极次数" prop="positive">
              <el-input v-model="form.account" placeholder="请输入表现积极次数"></el-input>
            </el-form-item>

            <el-form-item label="小测获得A" prop="getA">
              <el-input v-model="form.account" placeholder="请输入小测获得A次数"></el-input>
            </el-form-item>

            <el-form-item label="小测获得B" prop="getB">
              <el-input v-model="form.account" placeholder="请输入小测获得B次数"></el-input>
            </el-form-item>

            <el-form-item label="小测获得C" prop="getC">
              <el-input v-model="form.account" placeholder="请输入小测获得C次数"></el-input>
            </el-form-item>

            <el-form-item label="小测获得D" prop="getD">
              <el-input v-model="form.account" placeholder="请输入小测获得D次数"></el-input>
            </el-form-item>

            <el-form-item label="小测获得F" prop="getF">
              <el-input v-model="form.account" placeholder="请输入小测获得D次数"></el-input>
            </el-form-item>

            <el-form-item label="作业最终分数" prop="homeworkScore">
              <el-input v-model="form.account" placeholder="请输入作业最终分数"></el-input>
            </el-form-item>

            <el-form-item label="作业缺交次数" prop="homeworkMiss">
              <el-input v-model="form.account" placeholder="请输入作业缺交次数"></el-input>
            </el-form-item>

            <el-form-item label="卷面成绩" prop="results">
              <el-input v-model="form.account" placeholder="请输入卷面成绩"></el-input>
            </el-form-item>
<!-- 
            <el-form-item label="总分" prop="total">
              <el-input v-model="form.account" placeholder=""></el-input>
            </el-form-item> -->

            <el-form-item>
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
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "inputsingle",
    data() {
       var validateTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('标题不能为空，请输入'));
        } else {
          callback();
        }
      };

      var validateContent = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空，请输入'));
        } else {
          callback();
        }
      }; 
      return {
        visible: false,
        value1: '',
        options: [],
        value: 3,


        form: {
          title: '',
          content: ''
        },

        rules: {
          title: {validator: validateTitle, trigger: 'blur'},
          content: {validator: validateContent, trigger: 'blur'},
        },

        name: '',
        clazzId: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        content: ''
      }
    },

    created() {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.form.clazzId = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.form.clazzId)
      else this.form.clazzId = localStorage.getItem('clazzvalue')
    },

    methods: {
      selectChange() {
        localStorage.setItem('clazzvalue', this.form.clazzId)
      },

      onSubmit(formName) {
        console.log('submit!');
        let info = {
          notificationName: this.form.title,
          content: this.form.content,
          clazzId:this.form.clazzId,
          issuer: localStorage.getItem('teacherName'),
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
              data: JSON.stringify(info),
              url: 'http://1.15.149.222:8080/coursewebsite/teacher/result/add',
            }).then((response) => {          //这里使用了ES6的语法
              console.log(JSON.stringify(response.data.data))       //请求成功返回的数据
              if (response.data.code==='200') {
                alert('发布成功')
                this.$router.push('/teacher/result/resultlist')
                this.$router.go(0)
              }
            }).catch((error) => {
              console.log(error)       //请求失败返回的数据
              this.tipBox = true
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        /*this.$axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(info),
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/notice/add',
        }).then((response) => {          //这里使用了ES6的语法
          console.log(JSON.stringify(response.data.data))       //请求成功返回的数据
          if (response.data.code==='200') {
            alert('发布成功')
            this.$router.push('/teacher/activity/noticelist')
            this.$router.go(0)
          }
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
          this.tipBox = true
        })*/

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
  width: 95%;
}

.divP2 {
  background-color: #e8e8e8;
  height:100%;
}

.p2 {
  font-size: 20px;
  font-weight: bold;
  margin-top:-3%;
  margin-left: 2%;
  padding-top:2%;
  padding-bottom:2%;
}

#inputsingle {
  margin-left: 2%;
  margin-right: 3%;
  width:80%;
}

#inputsinglehead{
  font-size:21px;
  margin-left: 3%;
  width:90%;
}



.button{
  background-color: #4ab2ee;
  color:white;
  float: right;
  margin-bottom: 2%;
}
</style>
