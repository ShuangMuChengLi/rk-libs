# Vue性能优化之使用gzip压缩打包，减小chunk-venders.js体积 

[gzip学习](https://www.cnblogs.com/zoushuangyu/p/16095732.html)

## dependence
安装 npm install --save-dev compression-webpack-plugin@1.1.2

## nginx配置
### 检查nginx模块
首先要检查一下nginx的模块，找到nginx的q启动文件，我的是/usr/local/nginx，如果你找不到可以使用ps -ef | grep nginx命令找到master进程所在的目录，进入sbin目录然后执行./nginx -V，注意是大写的V，查看结果如下：


## usage

```vue
// vue.config.js里加上配置如下
module.exports = {
  chainWebpack: config => {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    if (process.env.NODE_ENV === 'production') {
        config.plugin('CompressionPlugin').use(
            new CompressionWebpackPlugin({
            test: /\.(js|css)$/,
            threshold: 10240, // 超过10kb的文件就压缩
                  deleteOriginalAssets:true, // 不删除源文件
                  minRatio: 0.8
          })
        )
       }
  }
}

// nginx配置
#gzip  on;
    vhost_traffic_status_zone;
    vhost_traffic_status_filter_by_host on;

    gzip on;  
    gzip_min_length 1k;
    gzip_buffers 16 64k; 
    gzip_http_version 1.1;  
    gzip_comp_level 6;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
    gzip_vary off;  
    gzip_disable "MSIE [1-6]\.";
```






