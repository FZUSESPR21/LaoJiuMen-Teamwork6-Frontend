<template>
<div>
  <div id="left">
    <router-link to="/teacher/result/taskanalysis" tag="button" id="taskAnalbtn">作业成绩分析</router-link>
    <router-link to="/teacher/result/finalanalysis" tag="button" id="finalAnalbtn">期末成绩分析</router-link>
  </div>
  <div id="right">
    <div id="divSelect">
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
      </el-form>
    </div>
    <div id="main"></div>
<!--    <taskechart></taskechart>-->
  </div>

</div>
</template>

<script>
  import echarts from 'echarts'
  // import taskechart from './finalechart.vue'
  export default {
  // components: { taskechart },
    name: 'finalanalysis',
    data() {
      return {
        options: [],
        value: '',
        list: [],
        a:'',
        b:'',
        c:'',
        d:'',
        e:'',
        f:'',
        g:'',
      }
    },
    methods:{
      selectChange() {
        localStorage.setItem('clazzvalue', this.value)
        this.initChart();
      },
      initChart() {
        this.char=echarts.init(document.getElementById("main"));
        this.char.setOption({
          tooltip:{},
          series:[
            {
              name: '访问来源',
              type: 'pie',
              radius: '80%',
              data: []
            }
          ]
        });
        this.$axios.get('http://1.15.149.222:8080/coursewebsite/teacher/score/final?cid='+localStorage.getItem('clazzvalue'))
          .then((res)=>{
            console.log('访问后台');
            // console.log(res.data);
            var list = [{'name': '100', 'value':res.data.data.a},
              {'name': '90-99', 'value':res.data.data.b},
              {'name': '85-89', 'value':res.data.data.c},
              {'name': '80-84', 'value':res.data.data.d},
              {'name': '70-79', 'value':res.data.data.e},
              {'name': '60-69', 'value':res.data.data.f},
              {'name': '0-59', 'value':res.data.data.g} ];
            console.log(list);
            this.char.setOption({
              series:[
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '80%',
                  data:list//赋值
                }
              ]
            })
          });
      },
    },
    created() {
      this.options = JSON.parse(localStorage.getItem('clazzInfo'))
      this.value = this.options[0].id+''
      if (!localStorage.getItem('clazzvalue'))
        localStorage.setItem('clazzvalue', this.value)
      else this.value = localStorage.getItem('clazzvalue')
      this.initChart();
    },
    mounted: function() {
      // this.$nextTick(function() {
      //   this.getPie()
      // })
      this.initChart();
    },
  }

</script>

<style scoped>
#divSelect {
  margin-left: 2%;
  margin-top: 2%
}

#left{
  height: 100%;
  width: 15%;
  float: left;
  text-align: center;
  margin-left: 0%;
}
#right{
  float:right;
  width:85%;
  height: 100%;
}
#taskAnalbtn{
  height: 50px;
  width: 100%;
  border-style: solid;
  border-color: #f0eeee;
  background-color: white;
}
#finalAnalbtn{
  height: 50px;
  width: 100%;
  border-style: solid;
  border-color: #f0eeee;
  background-color: #4ab2ee;
}
.router-link-active{
  color: white;
  background-color: #4ab2ee;
}
.router-link-active-focus{
  border: none;
}
#main{
  height:500px;
  width:90%;
  margin-top:5%;
}
</style>

