# 添加页面水印
## preview
[预览](./index.html#/demo/watermark-demo)
## download
[库文件下载](./js/html/watermark.zip)
## dependence
null
## Functions
### addWatermark(settings)
添加水印
#### arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| settings | 水印配置 | Object | - | defaultSettings | 
##### settings
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| watermark_txt | 水印文字 | String | - | '' | 
| watermark_x | 水印起始位置x轴坐标 | Number | - | 20 | 
| watermark_y | 水印起始位置Y轴坐标 | Number | - | 20 | 
| watermark_rows | 水印行数 | Number | - | 20 | 
| watermark_cols | 水印列数 | Number | - | 20 | 
| watermark_x_space | 水印x轴间隔 | Number | - | 100 | 
| watermark_y_space | 水印y轴间隔 | Number | - | 50 | 
| watermark_color | 水印字体颜色 | String | - | '#aaa' | 
| watermark_alpha | 水印透明度 | Number | - | 0.4 | 
| watermark_fontsize | 水印字体大小 | String | - | '15px' | 
| watermark_font | 水印字体 | String | - | '微软雅黑' | 
| watermark_width | 水印宽度 | Number | - | 210 | 
| watermark_height | 水印长度 | Number | - | 80 | 
| watermark_angle | 水印倾斜度数 | Number | - | 20 | 
#### return
null

### removeWatermark()
移除水印
#### arg
null
#### return
null


## usage
```
import { addWatermark, removeWatermark } from './watermark/watermark';
addWatermark({watermark_txt: 'test'});

removeWatermark();
```
