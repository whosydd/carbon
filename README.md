# Carbon

## Usage

### Download PNG

默认会通过发送`ajax`请求获取图片，保存到项目根目录的`carbon`文件夹，然后通过默认程序打开图片

![download-png](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110100015620.gif)

### Open in carbon.now.sh

![open-in-web](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110100016347.gif)

## Configuration

### Theme

如果你不想使用网站的默认主题，那么可以选择从 [carbon.now.sh](https://carbon.now.sh/) 中导出你的配置，修改以下选项

```json
// settings.json
"carbon.theme": {} // default
```

![export-config](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092129742.png)

#### Domain

由于是通过`ajax`获取图片，domain 默认使用[[petersolopov/carbonara](https://github.com/petersolopov/carbonara)提供的`carbonara-42.herokuapp.com`，如果你想配置自己的 domain，可以选择[fork](https://github.com/petersolopov/carbonara)此仓库自行搭建服务器（可以使用[vercel](https://vercel.com/)部署），然后配置以下选项

```json
// settings.json
"carbon.domain": "carbonara-42.herokuapp.com" // default
```

## Issues

目前下载图片的请求时间以及**第一次**打开网页的缓冲时间都稍长，我还未找到办法解决，如果你有好的解决办法，[欢迎pr~](https://github.com/whosydd/carbon)

## Thanks

[carbon-now-sh](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh)

[petersolopov/carbonara](https://github.com/petersolopov/carbonara)

Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
