<template>
  <div id="div1">
    <div id="divP">
      <p class="p1">发布通知</p>
    </div>
    <div class="textitem">
      <div id="noticedeliver">
        <div id="noticehead"><p>通知内容</p></div>

          <el-form ref="form" :model="form" :rules="rules" label-width="80px" id="noticeMessage">
            <el-form-item label="班级">
              <el-select v-model="form.clazzId" placeholder="请选择年份班级" @change="selectChange">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.clazzName"
                  :value="item.id+''">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="标题">
              <el-input v-model="form.name" placeholder="请输入通知标题"></el-input>
            </el-form-item>

            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content" rows="4" placeholder="请输入通知内容" resize="none"></el-input>
            </el-form-item>

            <el-form-item>
              <el-popover
                placement="top"
                width="160"
                v-model="visible">
                <p>确定发布该通知吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="onSubmit('form'), visible=false">确定</el-button>
                </div>
                <el-button slot="reference" type="primary" plain size="mini" class="button">发布</el-button>
              </el-popover>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "noticedeliver",
    data() {
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
#div1 {
  background-color: white;
  margin-top: -1%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#divP {
  background-color: #e8e8e8;
}

.p1 {
  font-size: 15px;
  font-weight: bold;
  margin-left: 2%;
}

#noticedeliver {
  margin-left: 2%;
  margin-right: 3%;
}

#noticehead{
  font-size:21px;
  margin-left: 3%;
}



.button{
  background-color: #4ab2ee;
  color:white;
  float: right;
  margin-bottom: 2%;
}
</style>
