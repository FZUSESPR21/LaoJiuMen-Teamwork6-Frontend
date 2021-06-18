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

    <label class="text">小测链接</label>
    <div id="input">
      <el-input v-model="testLink" placeholder="请输入" resize="none"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",

  data() {
    return {
      testLink: '',
    }
  },

  created () {
    this.options = JSON.parse(localStorage.getItem('clazzInfo'))
    this.value = this.options[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.value)
    else this.value = localStorage.getItem('clazzvalue')
    this.querySearch(this.currentPage);
  },

  methods: {
    selectChange() {
      this.querySearch(this.currentPage);
      localStorage.setItem('clazzvalue', this.value)
    },

    querySearch() {
      let info = {

      }

      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework/all?clazzId=' + this.value,
      }).then((response) => {          //这里使用了ES6的语法
        console.log(response.data.data.list)
        this.tableData = response.data.data.list
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

#table {

  font-weight: normal;
}

.button {
  background-color: white;
  color: #4ab2ee;
}

#input {

  margin-right: 5%;
  width: 80%;
}
</style>
