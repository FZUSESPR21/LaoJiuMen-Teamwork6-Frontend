<template>
  <div>
    <div id="editbox">
      <div id="edithead">
        <span id="headtitle">新建班级</span>
      </div>
      <div id="classmessage">
        <el-form  :rules="rules" :model="classmessage" ref="classmessage">
          <el-form-item label="请输入班级名字：(推荐格式：年份+班级昵称)" prop="clazzName">
            <el-input placeholder="单行输入" v-model="classmessage.clazzName" required size="small" id="classname"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div id="editfoot">
        <el-button id="cancelbtn" size="small" @click="goback">取消</el-button>
        <el-button type="primary" id="confirmbtn" @click="submitForm('classmessage')" size="small">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newclass",
  data(){
    return{
      classmessage:{
        clazzName:'',
        teacherId:localStorage.getItem('id')
      },

      rules:{
        clazzName:[
          {required:true,message:'班级名字不能为空', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      let clazz = {
        clazzName:this.classmessage.clazzName,
        teacherId:this.classmessage.teacherId
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(clazz),
            url: 'http://1.15.149.222:8080/coursewebsite/teacher/cls/add',
          }).then((response) => {          //这里使用了ES6的语法
            // console.log(JSON.stringify(response))       //请求成功返回的数据
            // console.log(response.data.data)
            if (response.data.code === '200') {
              alert('新增班级成功!');
              localStorage.setItem('clazzInfo',JSON.stringify(response.data.data))
              this.$router.push('/teacher/manage/studentlist')
              this.$router.go(0)
            }
            else {
              alert('新增班级失败!');
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
  height: 260px;
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
#classmessage{
  height: 130px;
  margin-top: 20px;
  margin-left: 6%;
  margin-right: 6%;
}
#editfoot{
  height: 80px;
  width: 100%;
  border-top: 1px solid #e7e4e4;
  border-radius: 0px 0px 10px 10px;
}
#classname{
  width: 100px;
  display: inline;
  float: left;
  margin-left: 100px;
}
#cancelbtn{
  width: 65px;
  float: right;
  margin-right: 5%;
  margin-top: 10px;
  color: #2caff6;
  border-color: #2caff6;
}
#confirmbtn{
  width: 65px;
  float: right;
  margin-right: 2%;
  margin-top: 10px;
}
</style>
