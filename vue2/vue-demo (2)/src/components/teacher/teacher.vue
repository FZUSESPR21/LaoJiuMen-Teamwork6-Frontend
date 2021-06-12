<template>
  <div>
    <Teacherheader></Teacherheader>
    <cloudimg v-show="state"></cloudimg>
    <div id="content" v-show="state">
      <router-view></router-view>
    </div>
    <div id="home" v-show="!state">
      <home></home>
    </div>
  </div>
</template>

<script>
import Cloudimg from '../Layout/cloudimg.vue';
import Header from "../Layout/StudentHeader";
import Studentheader from "../Layout/StudentHeader";
import home from "../student/home";
import Teacherheader from "../Layout/TeacherHeader";

export default {
  name: "student",
  components: {
    Teacherheader,
    Header,
    Cloudimg,
    home
  },
  data(){
    return{
      state:true,
    }
  },
  watch:{
    $route:{
      handler(val,oldval){
        if (this.$route.path==='/teacher/home')
          this.state = false
        else this.state = true
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
  margin-top: -10%;
  margin-left: 15%;
  margin-right: 15%;
}
#home{

}
</style>
