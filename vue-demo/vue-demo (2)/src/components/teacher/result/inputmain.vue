<template xmlns="http://www.w3.org/1999/html">
  <div>


    <div class="sidebar1">
      <inputbar></inputbar>
    </div>

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
#head{
  font-size: 20px;
  height: 75px;
  margin-left: 50px;
  margin-top: 20px;
}

#head1 {
  margin-bottom: 10px;
}

#head2 {
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part1{
  background-color: rgb(255, 255, 255);
  float:left;
  width: 90%;
  margin-left: 15%;
  margin-top: -11.5%;
}

.sidebar1{
  float: left;
  width: 10%;
}
</style>
