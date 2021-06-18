<template>
  <div id="div1">
    <sapn id="tag">作业详情</sapn>
    <el-table id="table"
              :data="tableData"
              :row-style="{height:'100px'}"
              :show-header="status"
              border>
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop">
      </el-table-column>
    </el-table>

    <div id="div2" align="center">
      <el-input id="input" v-model="content" rows="5" type="textarea" placeholder="请输入内容" resize="none"></el-input>
      <input class="file" name="file" type="file"  @change="select"/>
      <br>
      <br>
      <el-button type="primary" plain size="mini" @click="submit" id="button1">提交</el-button>
      <el-button type="primary" plain size="mini" @click="cancel" id="button2">取消</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "homeworkdetail",
  data() {
    return {
      status: false,

      tableCol: [
        {prop: "key", label: "键"},
        {prop: "value", label: "值"},

      ],

      tableData: [
        {key: "标题：", value: this.$route.query.name},
        {key: "截止时间：", value: this.$route.query.endDate},
        {key: "作业内容：", value: this.$route.query.content},

      ],

      sId: localStorage.id,
      hwId: this.$route.query.hwId,
      content: '',
      file: ''

    };
  },


  methods: {
    submit() {

      let param = new FormData() // 创建form对象
      if(this.file !== '') {
        param.append('file', this.file, this.file.name) // 通过append向form对象添加数据
      }
      param.append('homeworkId',this.hwId)
      param.append('studentId',this.sId)
      param.append('content',this.content)

      // withCredentials: true 使得后台可以接收表单数据  跨域请求
      const instance = this.$axios.create({
        withCredentials: true
      })
      // url为后台接口
      instance.post('http://1.15.149.222:8080/coursewebsite/student/homework_result/submit', param)
        .then((response) => {          //这里使用了ES6的语法
          /*console.log(JSON.stringify(response))       //请求成功返回的数据
          alert(JSON.stringify(response))
          alert("成功")*/
          if (response.data.code === '200') {
            alert('提交成功')
            this.$router.push('/student/activity/submittedhomeworklist')
            this.$router.go(0)
          }
        }).catch((error) => {
          console.log(error)//请求失败返回的数据
        })


    },

    cancel() {
      this.$router.push('/student/activity/homeworklist')
    },

    select (e) {
      this.file = e.target.files[0]
    },

  },

}
</script>

<style scoped>
#input {
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;

}

#tag {
  margin-left: 1%;
  font-weight:bold;
  color: #000000;
  background-color: white;
}

#table {
  margin-top: 2%;
  margin-left: 3%;

  width: 94%;
}

#div1 {
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
  margin-bottom: 2%;
}

#div2 {
  margin-top: 2%;
  margin-left: 3%;
  margin-right: 3%;
}

#button1 {
  color: white;
  background-color: #4ab2ee;
  margin-bottom: 2%;
}

#button2 {
  color: #4ab2ee;
  background-color: white;
  margin-bottom: 2%;
}
</style>
