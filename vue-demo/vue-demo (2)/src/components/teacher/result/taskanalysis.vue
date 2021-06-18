<template>
<div>
  <div id="left">
    <router-link to="/teacher/result/taskanalysis" tag="button" id="taskAnalbtn">作业成绩分析</router-link>
    <router-link to="/teacher/result/finalanalysis" tag="button" id="finalAnalbtn">期末成绩分析</router-link>
  </div>
  <div id="right">
    <p class="helpform"></p>
    <el-form>
      <el-form-item label="班级" >
        <el-select placeholder="请选择年份班级" v-model="value" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.clazzName"
            :value="item.id+''">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作业">
        <el-select placeholder="请选择作业" v-model="value2" @change="titleChange">
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.title"
            :value="item.id+''">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div id="main"></div>
<!--    <taskechart></taskechart>-->
  </div>
</div>
</template>

<script>
  import echarts from 'echarts'
  // import taskechart from './taskechart.vue'
  export default {
  // components: { taskechart },
    name: 'taskanalysis',
    data() {
      return {
        options: [],
        options2:[],
        value: '',
        value2:'',
        list: [],
        a:'',
        b:'',
        c:'',
        d:'',
        e:'',
        f:'',
        g:'',
        h:'',
        i:''
      }
    },
    methods:{
      selectChange() {
        localStorage.setItem('clazzvalue', this.value)
        this.initChart();
      },
      titleChange(){
        this.initChart()
      },
      QueryHomework(){
        this.$axios({
          method: 'get',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework/title?clazzId='+localStorage.getItem('clazzvalue') ,
        }).then((response) => {          //这里使用了ES6的语法
          console.log(JSON.stringify(response.data.data))       //请求成功返回的数据
          this.options2 = response.data.data
          this.value2 = this.options2[0].id+''

        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      initChart() {
        this.char=echarts.init(document.getElementById("main"));
        this.char.setOption({
          tooltip:{},
          series:[
            {
              name: '访问来源',
              type: 'pie',
              radius: '70%',
              data: []
            }
          ]
        });
        this.$axios.get('http://1.15.149.222:8080/coursewebsite/teacher/score/homework?hid='+this.value2+'&&cid='+localStorage.getItem('clazzvalue'))
          .then((res)=>{
            console.log('访问后台');
            // console.log(res.data);
            var list = [{'name': '100', 'value':res.data.data.a},
              {'name': '90-99', 'value':res.data.data.b},
              {'name': '85-89', 'value':res.data.data.c},
              {'name': '80-84', 'value':res.data.data.d},
              {'name': '70-79', 'value':res.data.data.e},
              {'name': '60-69', 'value':res.data.data.f},
              {'name': '0-59', 'value':res.data.data.g} ,
              {'name': '缺交', 'value':res.data.data.h},
              {'name': '未评分', 'value':res.data.data.i} ];
            console.log(list);
            this.char.setOption({
              series:[
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '70%',
                  data:list//赋值
                }
              ]
            })
          });
      },
    },
    mounted: function() {
      // this.$nextTick(function() {
      //   this.getPie()
      // })
      this.initChart();
    },
    created() {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.value = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.value)
      else this.value = localStorage.getItem('clazzvalue')
      this.QueryHomework();
      this.initChart();
    }
  }
</script>

<style scoped>
.helpform{
  margin-top: 5%;
}
.router-link-active{
  color: white;
  background-color: #4ab2ee;
}
.router-link-active-focus{
  border: none;
}
#taskAnalbtn{
  height: 50px;
  width: 100%;
  border-style: solid;
  border-color: #f0eeee;
  background-color: #4ab2ee;
}
#finalAnalbtn{
  height: 50px;
  width: 100%;
  border-style: solid;
  border-color: #f0eeee;
  background-color: white;
}
#left{
  height: 100%;
  width: 15%;
  float: left;
  text-align: center;
  margin-left: 0%;
  margin-top: -3%;
}
#right{
  float:right;
  width:85%;
  height: 100%;
}
#main{
  height:500px;
  width:90%;
  margin-top:5%;
}
</style>

