<template>
  <div>
    <Studentheader></Studentheader>
    <cloudimg v-show="state==='0'"></cloudimg>
    <div id="content" v-show="state==='0'">
      <router-view></router-view>
    </div>
    <div id="home" v-show="state==='1'">
      <home></home>
    </div>
    <div id="courseplan" v-show="state==='2'">
      <course-plan></course-plan>
    </div>
  </div>
</template>

<script>
import Cloudimg from '../Layout/cloudimg.vue';
import home from "../student/home";
import Studentheader from "../Layout/StudentHeader";
import CoursePlan from "./source/coursePlan";

export default {
  name: "student",
  components: {
    CoursePlan,
    Studentheader,
    Cloudimg,
    home
  },
  data(){
    return{
      state:'0',
    }
  },
  watch:{
    $route:{
      handler(val,oldval){
        if (this.$route.path==='/student/home')
          this.state = '1'
        else if (this.$route.path==='/student/source/courseplan')
          this.state = '2'
        else this.state = '0'
      },
      immediate:true
    }
  }
}
</script>

<style scoped>
#content{
  width: 70%;
  position: relative;
  margin-top: -90px;
  margin-left: 15%;
  margin-right: 15%;
}
#home{

}
</style>
