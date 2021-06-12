<template>
  <div>
    <div id="login">
      <p id="title">设置新密码</p>
      <el-form :model="usermessage" :rules="rules" ref="usermessage">
        <el-form-item id="type" prop="type">
          <el-radio-group v-model="usermessage.type">
            <el-radio label="0">学生</el-radio>
            <el-radio label="1">教师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item id="emailbox" prop="email">
          <el-input placeholder="请输入邮箱" v-model="usermessage.email" clearable id="email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item id="accountbox" prop="account">
          <el-input placeholder="请输入账号" v-model="usermessage.account" clearable id="account" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item id="verificationbox">
          <el-input placeholder="请输入验证码" v-model="usermessage.verification" id="verification" prefix-icon="el-icon-key" style="float: left; width: 180px;margin-right: 5px"></el-input>
          <el-button v-show="show" id="verificationbtn" @click="getCode">发送验证码</el-button>
          <el-button v-show="!show" id="count">{{count}} s</el-button>
        </el-form-item>
        <el-form-item id="newpwdbox" prop="pwd">
          <el-input placeholder="请输入新密码" v-model="usermessage.pwd" show-password id="pwd" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item id="againpwdbox" prop="pwdconfirm">
          <el-input placeholder="请再次输入新密码" v-model="usermessage.pwdconfirm" show-password id="pwdconfirm" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <button @click="setnewpwd('usermessage')" id="confirmbtn">确定</button>
    </div>
    <div id="directloginbox">
      <router-link to="/login/login" id="directlogin">直接登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SetPassword",
  data(){
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.usermessage.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      usermessage:{
        type: '',
        email: '',
        account: '',
        verification: '',
        pwd: '',
        pwdconfirm: ''
      },
      show: true,
      count:'',
      rules:{
        type:[
          {required: true, message: '请选择用户类型', trigger: 'change'}
        ],
        email: [
          {required:true,message:'邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        account:[
          {required: true, message: '账号不能为空', trigger: ['blur', 'change']}
        ],
        pwd:[
          {required: true, message: '密码不能为空', trigger: 'blur'},
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, message: '密码必须同时包含数字与字母,且长度为 8-20位' }
        ],
        pwdconfirm: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    setnewpwd(formName){
      let message = {
        type:this.usermessage.type,
        account:this.usermessage.account,
        email:this.usermessage.email,
        captcha: this.usermessage.verification,
        pwd:this.usermessage.pwd
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (message.captcha === localStorage.getItem('captcha')) {
            this.$axios({
              method: 'post',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
              data: JSON.stringify(message),
              url: 'http://1.15.149.222:8080/coursewebsite/chg_pwd',
            }).then((response) => {          //这里使用了ES6的语法
              console.log(JSON.stringify(response))       //请求成功返回的数据
              alert('成功修改密码')
              // console.log(response.data.data)
              // if (response.data.code === 200) {
              //   alert(response.data.message)
              //   this.$router.push('/login')
              // } else if (response.data.code === 401) {
              //   alert(response.data.message)
              // }
            }).catch((error) => {
              console.log(error)       //请求失败返回的数据
            })
          } else {
            alert("验证码错误！");
            return false;
          }
        } else {
          console.log('error !!');
          return false;
        }
      });
    },
    getCode(){
      let codeMessage = {
        type:this.usermessage.type,
        email:this.usermessage.email,
        account:this.usermessage.account
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(codeMessage),
        url: 'http://1.15.149.222:8080/coursewebsite/captcha',
      }).then((response) => {          //这里使用了ES6的语法
        alert(JSON.stringify(response.data.message));
        localStorage.setItem("captcha",response.data.data);
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
      // const TIME_COUNT = 60;
      // if (!this.timer) {
      //   this.count = TIME_COUNT;
      //   this.show = false;
      //   this.timer = setInterval(() => {
      //     if (this.count > 0 && this.count <= TIME_COUNT) {
      //       this.count--;
      //     } else {
      //       this.show = true;
      //       clearInterval(this.timer);
      //       this.timer = null;
      //     }
      //   }, 1000)
      // }
      // alert("发送信息")
    }
  }
}
</script>
<style scoped>
#login{
  margin-top: 7%;
  margin-left: 17%;
  margin-right: 17%;
  position: relative;
}
#title{
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 0;
}
#type{
  text-align: center;
}
#emailbox{
  margin-top: 15px;
}
#verificationbox{
  margin-top: 15px;
  width: 100%;
}
#count{
  width: 108px;
  margin-left: 0;
}
#accountbox{
  margin-top: 15px;
}
#newpwdbox{
  margin-top: 15px;
}
#againpwdbox{
  margin-top: 15px;
}
#confirmbtn{
  margin-top: 25px;
  height: 55px;
  width: 100%;
  border: 0;
  font-size: 23px;
  color: white;
  border-radius: 50px;
  background: linear-gradient(to bottom, #3333d7, #03036d);
}
#directloginbox{
  margin-top: 10px;
  margin-right: 50px;
  text-align: right;
}
#directlogin{
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

