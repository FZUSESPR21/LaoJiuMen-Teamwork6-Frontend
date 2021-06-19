<template xmlns="http://www.w3.org/1999/html">
  <div>


<!--    <div class="sidebar1">
      <inputbar></inputbar>
    </div>-->

    <div class="part1">
      <router-view></router-view>
    </div>

  </div>


</template>


<script>
import inputbar from "./inputbar";
export default {
  name: "inputmain",
  components: {
    inputbar
  },
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
.part1{
  background-color: rgb(255, 255, 255);
  margin-left: 3%;
  margin-right: 3%;
}

.sidebar1{
  float: left;
  width: 15%;
}
</style>
