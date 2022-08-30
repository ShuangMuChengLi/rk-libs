# 中间层弹窗的混入innerDialogMixin
用于弹窗的二次封装时，提供visible的props,dialogVisible的data。监听两者，并相互赋值。
## download
[库文件下载](./js/html/inner-dialog-mixin.zip)

#### data
| 参数 |	说明 |类型 | 默认值 | 
| ---- | ---- |---- | ----   | 
| dialogVisible | 内置弹窗的显示控制参数 | Boolean | false |
#### props
| 参数 |	说明 |类型 | 默认值 | 
| ---- | ---- |---- | ----   | 
| visible | 外置弹窗的显示控制参数 | Boolean | false |
#### usage
capture-dialog.vue
```vue
<common-dialog
    :visible.sync="dialogVisible">
</common-dialog>
<script>
import {innerDialogMixin} from './inner-dialog-mixin';
export default {
  mixins: [innerDialogMixin],
}
</script>

```
main.vue
```vue
<capture-dialog
  :visible.sync="captureDialogVisible" />
<script>
export default {
  data(){
    return {
      captureDialogVisible: false,
    };
  }
}
</script>

```
