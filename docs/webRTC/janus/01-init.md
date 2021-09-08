## 示例代码
```js
import * as Janus from './janus.es.js'

Janus.init({
   debug: true,
   dependencies: Janus.useDefaultDependencies(), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
   callback: function() {
           // Done!
   });
});
```