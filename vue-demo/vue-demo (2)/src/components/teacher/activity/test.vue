<template>
  <div>
    <div id="divSelect">
      班级：
      <el-select size="mini"
                 v-model="value"
                 placeholder="请选择班级"
                 @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''">
        </el-option>
      </el-select>
    </div>

    <div id="input">
      <label class="text">小测链接:</label>
      <el-input v-model="testLink" placeholder="请输入" resize="none"></el-input>
      <el-button class="button" type="primary" size="mini" @click="queryAdd">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",

  data() {
    return {
      testLink: '',
      value: '',
    }
  },

  created () {
    this.options = JSON.parse(localStorage.getItem('clazzInfo'))
    this.value = this.options[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.value)
    else this.value = localStorage.getItem('clazzvalue')
    this.querySearch();
  },

  methods: {
    selectChange() {
      this.querySearch();
      localStorage.setItem('clazzvalue', this.value)
    },

    querySearch() {
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: 'http://1.15.149.222:8080/coursewebsite/quiz/search?id=' + this.value,
      }).then((response) => {          //这里使用了ES6的语法
        console.log(response.data.data)
        this.testLink = response.data.data
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    queryAdd() {
      let info = {
        quizLink: this.testLink
      }

      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/quiz/update',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(response)
        alert('发布成功')
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
  }
}
</script>

<style scoped>
#divSelect {
  float: right;
  margin-right: 2%;
  margin-top: -40px
}

label {
  float: left;
  margin-bottom: 2%;
}


#input {
  float: left;
  margin-left: 2%;
  margin-right: 5%;
  width: 80%;
}

.button {
  margin-top: 2%;
}
</style>
