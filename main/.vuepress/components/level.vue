<template>
  <div>
    <!-- <div class="progress-head">{{ name }}</div>
    <div class="progress-body">
      <div class="progress-wrap progress">
        <div class="progress-bar progress" :style="processWidth"></div>
      </div>
    </div>-->
    <el-row :gutter="10">
      <el-col :span="6">
        <div>{{ name }}</div>
      </el-col>
      <el-col :span="18">
        <div class="progress-wrap progress" ref="progressWrap">
          <div
            class="progress-bar progress"
            ref="progressBar"
            :style="{ width: progressWidth + 'px' }"
          ></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
$background-color: #ddd;
$progress-color: rgb(26, 188, 156);
$head-width: 2;

.container {
  display: flex;
  width: 600px;
  margin: 5px 0;
  .progress-head {
    flex: $head-width;
  }
  .progress-body {
    flex: 10- $head-width;
  }
}

.progress {
  width: 100%;
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
  props: ["progress", "name"],
  data() {
    return {
      progressWidth: 100,
    };
  },
  methods: {
    setProgressWidth: function() {
      // 获取 wrap的宽度
      // 通过process的宽度来设置 bar的宽度
      const wrapWidth = this.$refs.progressWrap.clientWidth;
      const barWidth = (this.progress * wrapWidth) / 100;
      this.progressWidth = barWidth;
    },
  },
  mounted() {
    // 设置长度
    this.setProgressWidth();
  },
  // 当窗口的宽度变化, level相对应的大小也要改变  暂定后面再写
};
</script>
