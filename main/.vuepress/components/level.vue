<template>
  <div class="container">
    <div class="progress-head">{{ name }}</div>
    <div class="progress-body">
      <div class="progress-wrap progress">
        <div class="progress-bar progress" :style="processWidth"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$background-color: #ddd;
$progress-color: rgb(26, 188, 156);
$head-width: 2;

.container {
  display: flex;
  margin: 5px 0;
  .progress-head {
    flex: $head-width;
  }
  .progress-body {
    flex: 10- $head-width;
  }
}

.progress {
  width: 300px;
  height: 20px;
  display: inline-block;
}
.progress-wrap {
  background: $background-color;
  overflow: hidden;
  position: relative;
  .progress-bar {
    background: $progress-color;
    left: 0;
    position: absolute;
    top: 0;
  }
}
</style>
<script>
export default {
  name: "level",
  props: ["process", "name"],
  data() {
    return {
      processWidth: {
        width: `${this.process * 3}px`,
      },
    };
  },
};
</script>
