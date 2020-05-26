<template lang="pug">
//- pug 模板引擎
div.g-container
    div.g-middle 
        div.g-middle-inner middle-inner 
    div.g-left left
    div.g-right right
</template>
<style scoped lang="scss">
.g-container {
  position: relative;
  height: 50vh;
  min-width: 200px;
  border: 1px solid black;
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
  .g-middle-inner {
    margin: 0 100px;
  }
}
.g-left {
  position: relative;
  width: 100px;
  background: #ffcc00;
  margin-left: -100%;
}
.g-right {
  position: relative;
  width: 100px;
  background: pink;
  margin-left: -100px;
}
</style>
