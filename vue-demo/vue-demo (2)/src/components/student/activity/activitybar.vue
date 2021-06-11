<template>
  <el-row class="tac">
    <el-col :span="25">
      <el-menu
        :default-active="this.$router.path"
        router
        class="active-el-menu"
        @open="handleOpen"
        @close="handleClose">

        <el-menu-item class="item" index="/student/activity/homeworklist">
<!--          <router-link to="/student/activity/homeworklist"  tag="button" class="button">课程作业</router-link>-->
          <span>课程作业</span>
        </el-menu-item>

        <el-menu-item class="item" index="/student/activity/quiz">
<!--          <router-link to="/student/activity/quiz"  tag="button" class="button">课程小测</router-link>-->
          <span>课程小测</span>
        </el-menu-item>

        <el-menu-item class="item" index="/student/activity/submittedhomeworklist">
<!--          <router-link to="/student/activity/submittedhomeworklist" tag="button" class="button">已提交作业</router-link>-->
          <span>已提交作业</span>
        </el-menu-item>

        <el-menu-item class="item" index="/student/activity/noticelist">
<!--          <router-link to="/student/activity/noticelist"  tag="button" class="button">通知列表</router-link>-->
          <span>通知列表</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    data() {
      return {
        userID: 'kwz'
      }
    }
  }
</script>

<style>
/*.button{
  background-color: white;
  border: 2px
}*/

.item {
  font-weight: bold;
  width: 160px;
}

.item.is-active {
  background-color: #4ab2ee !important;
  color: white;
}



</style>
