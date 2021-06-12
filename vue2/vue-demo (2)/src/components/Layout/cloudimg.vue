<template>
  <div id="cloud">
    <img src="../../assets/back.png" id="cloudimg">
    <div id="headbox">
    </div>
  </div>
</template>

<script>

export default {
  name: "cloudimg"
}
</script>

<style scoped>
#cloud{
  width: 100%;
  height: 300px;
  position:relative;
}

#cloudimg{
  width:100%;
  height: 100%;
}

#headbox{
  height: 100px;
  width: 70%;
  border:1px solid #b6b4b4;
  box-shadow: 1px 0px 2px #b3b1b1;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: -106px;
  background-color: white;
  position:absolute;
}
</style>
