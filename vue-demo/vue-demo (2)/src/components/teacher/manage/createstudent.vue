<template>
  <div id="editbox">
    <div id="edithead">
      <span id="headtitle">编辑学生</span>
    </div>
    <div id="stumessage">
      <span id="messagetitle">学生信息</span>
      <el-form :model="stumessage" :rules="rules" ref="stumessage">
        <el-form-item label="学号" prop="account">
          <el-input placeholder="请输入学号" v-model.number="stumessage.account" required size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input placeholder="请输入姓名" v-model="stumessage.studentName" required size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="stumessage.email" required size="small"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="editfoot">
      <el-button id="cancelbtn" size="small" @click="goback">取消</el-button>
      <el-button type="primary" v-if="this.operatortype=='0'" id="newconfirmbtn" size="small" @click="newsubmitForm('stumessage')">新增</el-button>
      <el-button type="primary" v-if="this.operatortype=='1'" id="editconfirmbtn" size="small" @click="editsubmitForm('stumessage')">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "newstudent",
  data(){
    const validateAccount = (rule, value, callback) => {
      const numReg = /\d{9}/
      const reg = new RegExp(numReg);
      if (!value) {
        return callback(new Error('学号不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('学号应为9位数字'));
      } else {
        callback();
      }
    };
    return{
      stumessage: {
        clazzId:'',
        id:'',
        account: '',
        studentName:'',
        email:''
      },
      operatortype:'',
      rules:{
        account:[
          { required:true, validator: validateAccount, trigger: ['blur', 'change'] }
        ],
        studentName: [
          {required:true,message:'姓名不能为空', trigger: 'blur' }
        ],
        email: [
          {required:true,message:'邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.stumessage.id = this.$route.query.studentId
    this.stumessage.account = this.$route.query.account
    this.stumessage.studentName = this.$route.query.student_name
    this.stumessage.email = this.$route.query.email
    this.stumessage.clazzId = localStorage.getItem('clazzvalue')
    this.operatortype = this.$route.query.type
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },

    newsubmitForm(formName){
      let newMessage = {
        clazzId: this.stumessage.clazzId,
        account: this.stumessage.account,
        studentName: this.stumessage.studentName,
        email: this.stumessage.email
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(newMessage),
            url: 'http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/add',
          }).then((response) => {          //这里使用了ES6的语法
            // console.log(JSON.stringify(response))       //请求成功返回的数据
            // console.log(response.data.data)
            if (response.data.data === 1){
              alert('新增学生成功!');
              this.$router.push('/teacher/manage/studentlist')
            }
            else {
              alert('新增学生失败!');
            }
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    editsubmitForm(formName){
      let editMessage = {
        id:this.stumessage.id,
        account:this.stumessage.account,
        studentName:this.stumessage.studentName,
        email:this.stumessage.email
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(editMessage),
            url: 'http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/update',
          }).then((response) => {          //这里使用了ES6的语法
            // console.log(JSON.stringify(response))       //请求成功返回的数据
            // console.log(response.data.data)
            if (response.data.data === 1){
              alert('编辑学生成功!');
              this.$router.push('/teacher/manage/studentlist')
            }
            else {
              alert('编辑学生失败!');
            }
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
#editbox{
  border-radius: 20px;
  box-shadow: 2px 6px 10px #d9d9f5;
  height: 430px;
  margin-top: 20px;
  margin-left: 7%;
  margin-right: 7%;
}
#edithead{
  width: 100%;
  height: 50px;
  background-color: #eeeeee;
  border-radius: 20px 20px 0px 0px;
}
#headtitle{
  font-size: 13px;
  font-weight: bold;
  margin-left: 3%;
  line-height: 400%;
}
#stumessage{
  height: 300px;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 10px;
}
#messagetitle{
  font-size: 15px;
  font-weight: bold;
}
.el-form-item{
  margin-bottom: 10px;
}
#editfoot{
  height: 80px;
  width: 100%;
  border-top: 1px solid #e7e4e4;
  border-radius: 0px 0px 10px 10px;
}
#cancelbtn{
  width: 65px;
  float: right;
  margin-right: 5%;
  margin-top: 10px;
  color: #2caff6;
  border-color: #2caff6;
}
#newconfirmbtn{
  width: 65px;
  float: right;
  margin-right: 2%;
  margin-top: 10px;
}
#editconfirmbtn{
  width: 65px;
  float: right;
  margin-right: 2%;
  margin-top: 10px;
}
</style>
