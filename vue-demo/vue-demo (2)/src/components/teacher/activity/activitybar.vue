<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        class="menu"
        default-active="/teacher/activity/homeworklist"
        router
        @open="handleOpen"
        @close="handleClose"
        active-text-color="white">

        <el-menu-item class="item" index="/teacher/activity/homeworklist">
<!--          <router-link to="/teacher/activity/homeworklist" tag="button" class="button">作业列表</router-link>-->
          <span>作业列表</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/activity/publish">
<!--          <router-link to="/teacher/activity/publishhomework" tag="button" class="button">发布作业</router-link>-->
          <span>发布作业</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/activity/noticelist">
<!--          <router-link to="/teacher/activity/noticelist" tag="button" class="button">通知列表</router-link>-->
          <span>通知列表</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/activity/test">
          <span>课程小测</span>
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
.tac {
  width: 100%;
}
.menu {
  width: 100%;
}

.item {
  font-weight: bold;
  width: 100%;
}

.item.is-active {
  background-color: #4ab2ee !important;
  color: white;
}
</style>
