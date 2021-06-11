<template>
  <div>
    <div id="login">
      <p id="title">登录</p>
      <el-form :model="usermessage" :rules="rules" ref="usermessage">
        <el-form-item id="type" prop="type">
          <el-radio-group v-model="usermessage.type">
            <el-radio label="0">学生</el-radio>
            <el-radio label="1">教师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item id="accountbox" prop="account">
          <el-input placeholder="请输入账号" v-model="usermessage.account" clearable id="account" required prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item id="pwdbox" prop="pwd">
          <el-input placeholder="请输入密码" v-model="usermessage.pwd" show-password id="pwd" required prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <button @click="login('usermessage')" id="loginbtn">登录</button>
    </div>
    <div id="forgetbox">
      <router-link to="/login/setPassword" id="forget">忘记密码？</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginBox",
  data(){
    return{
      usermessage:{
        type: '',
        account: '',
        pwd: ''
      },
      rules:{
        type:[
          {required: true, message: '请选择用户类型', trigger: 'change'}
        ],
        account:[
          {required: true, message: '账号不能为空', trigger: ['blur', 'change']}
        ],
        pwd:[
          {required: true, message: '密码不能为空',trigger: ['blur', 'change']}
        ]
      },
    }
  },
  methods: {
    login(message){
      if (localStorage.getItem('token')) {
        localStorage.removeItem("token")
        localStorage.clear()
      }
      let userMessage = {
        type:this.usermessage.type,
        account:this.usermessage.account,
        password:this.usermessage.pwd
      }
      this.$refs[message].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(userMessage),
            url: 'http://1.15.149.222:8080/coursewebsite/login',
          }).then((response) => {          //这里使用了ES6的语法
            // console.log(JSON.stringify(response))       //请求成功返回的数据
            console.log(response.data.data)
            if (response.data.code === '200'){
              alert('登录成功！');
              if (userMessage.type === '0') {
                localStorage.setItem('token',response.data.message)
                localStorage.setItem('id',response.data.data.id)
                localStorage.setItem('account',response.data.data.account)
                localStorage.setItem('studentName',response.data.data.studentName)
                localStorage.setItem('clazzId',response.data.data.clazzId)
                this.$router.push('/student')
              }else if (userMessage.type === '1') {
                localStorage.setItem('token',response.data.message)
                localStorage.setItem('id',response.data.data.id)
                localStorage.setItem('account',response.data.data.account)
                localStorage.setItem('teacherName',response.data.data.teacherName)
                localStorage.setItem('clazzInfo',JSON.stringify(response.data.data.clazzInfo))
                this.$router.push('/teacher')
              }
            } else {
              alert('登录失败!');
            }
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        } else {
          console.log('error login!!');
          return false;
        }
      });
    },
    teacherlogin:function (){
      this.$router.push('/teacher')
    }
  }
}
</script>

<style scoped>

#login{
  margin-top: 17%;
  margin-left: 17%;
  margin-right: 17%;
  position: relative;
}
#title{
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}
#type{
  text-align: center;
}
#accountbox{
  margin-top: 30px;
}
#pwdbox{
  margin-top: 20px;
}
#loginbtn{
  margin-top: 50px;
  height: 55px;
  width: 100%;
  border: 0;
  font-size: 23px;
  color: white;
  border-radius: 50px;
  background: linear-gradient(to bottom, #3333d7, #03036d);
}
#forgetbox{
  margin-top: 40px;
  margin-right: 45px;
  text-align: right;
}
#forget{
  text-decoration: none;
  font-size: 10px;
}
a:link,a:active{
  color: black;
}
.el-form-item{
  margin-bottom: 0;
}
</style>
