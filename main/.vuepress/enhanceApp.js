import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
    Vue,
    options,
    router,
    siteData
}) => {
    // 使用element-ui
    Vue.use(ElementUI);
    // 将路由模式修改成 history
    router.mode = 'history';
}