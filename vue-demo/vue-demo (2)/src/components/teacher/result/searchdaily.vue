<template>
  <div>
      <!--      search部分-->
      <div class="dailysearch">
        <form>
          <input type="text" placeholder="请输入学号" id="searchdaily"></input>
          <el-button class="searchBtn" @click="showdaily">查看</el-button>
        </form>

      </div>

    <div id="singletable">
      <el-table :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="headeRowClass">
        <el-table-column
          v-for="(item,i) in tableCol"
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: "searchdaily",
  data() {
    return {
      //visible: false,
      formInline: {
        user: '',
        region: ''
      },
      options:[],
      tableCol: [
        {prop: "abs", label: "该生在本课程网站上签到的缺勤次数"},

        {label: "该生在本课程网站上的作业得分情况"},
        //{prop: "id", label: "id"},
        {prop: "hw1", label: "第一次作业"},
        {prop: "hw2", label: "第二次作业"},
        {prop: "hw3", label: "第三次作业"},
        {prop: "hw4", label: "第四次作业"},
        {prop: "hw5", label: "第五次作业"},

      ],

      tableData: [

      ],

      nId: '1',
      nname: '',
      content: '',
      start: 1,
      //默认数据总数
      totalCount: 1,
      //搜索条件
      criteria: '',
    };
  },
    methods: {




      headeRowClass({row, column, rowIndex, columnIndex}){
        //表头的背景颜色
        if(rowIndex==0){
          return 'background:#e8e8e8; color: black';
        }
      },

      querySearch(pageNum) {
        let info = {

        }

        this.$axios({
          method: 'get',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(info),
       //   url: 'http://1.15.149.222:8080/coursewebsite/teacher/score/down?numId='+ localStorage.getItem('numvalue') ,
        }).then((response) => {          //这里使用了ES6的语法
          console.log(response.data.data.list)
          this.tableData = response.data.data.list
          this.totalCount = response.data.data.total
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },

   
    },

    created () {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.value = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.value)
      else this.value = localStorage.getItem('clazzvalue')
      this.querySearch(this.currentPage);
    }
  };
</script>


<style scoped>
#dailysearch{
  float: right;
  margin-right: 2%;
  margin-top: 0%;
}

#searchdaily{
  margin-top:-4.5%;
  height:20%;
  float: left;
  font-size: 15px;
}

#singletable {
  font-weight: normal;
  width:95%;
}

.searchBtn {
  background-color: #4ab2ee;
  color: white;
float: left;
  margin-top:-5%;
  margin-left: 17%;
}

#button1 {
  color: white;
  background-color: #4ab2ee;
  float: right;
  margin-top: 2%;
  margin-right: 3%;
}

#pagination{
  float: right;
  margin-top: 2%;
}
</style>
