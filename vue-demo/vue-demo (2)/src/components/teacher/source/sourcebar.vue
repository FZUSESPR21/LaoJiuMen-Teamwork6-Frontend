<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="/teacher/source/study"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item class="item" index="/teacher/source/study">
<!--          <router-link to="/teacher/source/study" tag="button" class="button">学习资源</router-link>-->
          <span>学习资源</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/source/other">
<!--          <router-link to="/teacher/source/other" tag="button" class="button">学习资源</router-link>-->
          <span>其他资源</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/source/courseplan">
          <!--          <router-link to="/teacher/source/other" tag="button" class="button">学习资源</router-link>-->
          <span>授课计划</span>
        </el-menu-item>
      </el-menu>
    </el-col>

  </el-row>
</template>

<script>
/*export default {
  name: "sourcebar"
}*/
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>

<style scoped>
/*.button{
  background-color: white;
  border: 2px;
}*/

.item {
  font-weight: bold;
  width: 100%;
}

.item.is-active {
  background-color: #4ab2ee !important;
  color: white;
}
</style>
