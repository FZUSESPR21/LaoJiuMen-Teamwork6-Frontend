<template>
  <el-card class="bcard">
    <div slot="header" class="clearfix">
      <span>发布通知</span>
    </div>
    <div class="textitem">
      <div id="noticedeliver">
        <div id="noticehead"><p>通知内容</p></div>
          <el-form ref="form" :model="form" label-width="80px" id="noticeMessage">
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
              <el-button @click="onSubmit">发布通知</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </el-card>
</template>

<script>
  export default {
    name: "noticedeliver",
    data() {
      return {
        value1:'',
        options: [],
        value: 3,


        form: {
          name: '',
          clazzId: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          content: ''
      }
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

    onSubmit() {
      console.log('submit!');
      let info = {
        notificationName: this.form.name,
        content: this.form.content,
        clazzId:this.form.clazzId,
        issuer: localStorage.getItem('teacherName'),
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/notice/add',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(JSON.stringify(response.data.data))       //请求成功返回的数据
        alert('发布成功')
        this.$router.push('/teacher/activity/noticelist')
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
        this.tipBox = true
      })

//      this.$router.push('/teacher/activity/noticelist')
  //    this.$router.go(0)
    }
  },

}
</script>

<style scoped>

#head{
  background-color: white;
  font-size: 20px;
  height: 100px;
}
#noticedeliver{
  margin-top:0%;

  /*border-style:solid;
  border-width:1px;
  border-color:gray;
  border-radius:20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
}
#noticehead{
  font-size:21px;
  margin-top:0.2%;
  margin-bottom:2%;
  margin-left:7.5%;
}
button{
  background-color: #4ab2ee;
  color:white;
}
</style>
