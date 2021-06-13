<template>
  <el-row class="tac">
    <el-col :span="36">
      <el-menu
        default-active="/teacher/source/study"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item class="item" index="/teacher/source/study">
          <span>学习资源</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/source/other">
          <span>其他资源</span>
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
    }
  }

</script>

<style scoped>
.item {
  font-weight: bold;
  width: 100%;
}

.item.is-active {
  background-color: #4ab2ee !important;
  color: white;
}
</style>
