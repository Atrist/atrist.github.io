<template lang="pug">
//- pug 模板引擎
div.g-container
    div.g-middle middle
    div.g-left left
    div.g-right right
</template>
<style lang="scss" scoped>
.g-container {
  // overflow: hidden;
  position: relative;
  height: 50vh;
  padding: 0 100px;
  border: 1px solid black;
  min-width: 200px;
  & > div {
    height: 50vh;
    float: left;
    text-align: center;
    color: #fff;
    line-height: 50vh;
    font-size: 3vw;
  }
}
.g-middle {
  position: relative;
  width: 100%;
  background: #cc6630;
}
.g-left {
  position: relative;
  width: 100px;
  background: #ffcc00;
  margin-left: -100%;
  left: -100px;
}
.g-right {
  position: relative;
  width: 100px;
  background: pink;
  margin-left: -100px;
  right: -100px;
}
</style>
