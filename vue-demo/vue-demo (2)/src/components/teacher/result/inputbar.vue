<template>
  <el-row class="tac1">
    <el-col>
      <el-menu
        class="menu"
        default-active="/teacher/result/resultinput"
        router
        @open="handleOpen"
        @close="handleClose"
        active-text-color="white">

        <el-menu-item class="item" index="/teacher/result/resultinput">
          <span>批量录入学生成绩</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/result/dailyscore">
          <span>平时成绩构成比例</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/result/inputsingle">
          <span>录入单个学生成绩</span>
        </el-menu-item>

        <el-menu-item class="item" index="/teacher/result/searchdaily">
          <span>查询学生平时成绩</span>
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
.tac1 {
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
