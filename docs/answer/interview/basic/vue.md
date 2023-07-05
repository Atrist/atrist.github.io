## vue2 组件的生命周期
（1） beforeCreate 初始化实例后 数据观测和事件配置之前调用

（2） created 实例创建完成后调用

（3） beforeMount 挂载开始前被用

（4） mounted el 被新建 vm.$el 替换并挂在到实例上之后调用

（5） beforeUpdate 数据更新时调用

（6） updated 数据更改导致的 DOM 重新渲染后调用

（7） beforeDestory 实例被销毁前调用

（8） destroyed 实例销毁后调用

Vue2 与Vue3的生命周期对比

| Vue2                                      | ue3                                         |
| ----------------------------------------- | ------------------------------------------- |
| beforeCreate(组件创建之前)                | setup(组件创建之前)                         |
| created(组件创建完成)                     | setup(组件创建完成)                         |
| beforeMount(组件挂载之前)                 | onBeforeMount(组件挂载之前)                 |
| mounted(组件挂载完成)                     | onMounted(组件挂载完成)                     |
| beforeUpdate(数据更新，虚拟DOM打补丁之前) | onBeforeUpdate(数据更新，虚拟DOM打补丁之前) |
| updated(数据更新，虚拟DOM渲染完成)        | onUpdated(数据更新，虚拟DOM渲染完成)        |
| beforeDestroy(组件销毁之前)               | onBeforeUnmount(组件销毁之前)               |
| destroyed(组件销毁之后)                   | onUnmounted(组件销毁之后)                   |