<template>
  <div>
    <div id="input">
      <label class="text">小测链接:</label>
      <el-input v-model="testLink" resize="none" readonly></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "quiz",

  data() {
    return {
      testLink: '',
      value: '',
    }
  },

  created () {
    this.value = localStorage.getItem('clazzId')
    this.querySearch();
  },

  methods: {

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
