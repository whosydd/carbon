# Carbon

## Usage

### Download PNG

默认会通过发送`ajax`请求获取图片，保存到项目根目录的`carbon`文件夹，然后通过默认程序打开图片

![download-png](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110100015620.gif)

### Open in carbon.now.sh

![open-in-web](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110100016347.gif)

## Configuration

### Theme

```json
// settings.json
"carbon.theme": "Dracula ProPurchase" // default
```

### Domain

由于是通过`ajax`获取图片，domain 默认使用`carbon-api.vercel.app`，如果你想配置自己的 domain，可以参考 [whosydd/carbon-api](https://github.com/whosydd/carbon-api) 使用 [Vercel](https://vercel.com/) 部署，然后配置以下选项

```json
// settings.json
"carbon.domain": "carbon-api.vercel.app" // default
```

### Open image

下载图片后，是否打开图片

```json
// settings.json
"carbon.openImg": true // default
```



## Known Issues

由于我在 Vercel 使用的是 `Hobby plan`，所以每次请求时会有**10秒**`timeout`的限制，如果使用时出现无法下载的情况，请重新尝试。

## Thanks

[carbon-now-sh](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh)

[petersolopov/carbonara](https://github.com/petersolopov/carbonara)

Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
