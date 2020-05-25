<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <div>{{ name }}</div>
      </el-col>
      <el-col :span="18">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="progress" :status="status"></el-progress>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
$background-color: #ddd;
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
</style>
<script>
export default {
  name: "level",
  props: { progress: Number, name: String, status: String }
  // 当窗口的宽度变化, level相对应的大小也要改变  暂定后面再写
};
</script>
