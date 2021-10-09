# Carbon

## Usage

### Download PNG

默认会通过发送`ajax`请求获取图片，保存到项目根目录的`carbon`文件夹，然后通过默认程序打开图片

![download PNG](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092119154.gif)

### Open in carbon.now.sh

![open-in-web](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092119234.gif)

## Configuration

### Theme

如果你不想使用网站的默认主题，那么可以选择将以下配置项设置为`false`，默认为`true`

```json
// settings.json
"carbon.defaultTheme": true // default
```

然后从 [carbon.now.sh](https://carbon.now.sh/) 中导出你的配置，修改以下选项

```json
// settings.json
"carbon.theme": {} // default
```

![export-config](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092129742.png)

#### Domain

由于是通过`ajax`获取图片，domain 默认使用[[petersolopov/carbonara](https://github.com/petersolopov/carbonara)提供的`carbonara-42.herokuapp.com`，如果你想自己配置 domain，可以选择[fork](https://github.com/petersolopov/carbonara)此仓库自行搭建服务器（例如可以使用[vercel](https://vercel.com/)部署），然后配置以下选项

```json
// settings.json
"carbon.domain": "carbonara-42.herokuapp.com" // default
```


## Thanks

[carbon-now-sh](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh)

[petersolopov/carbonara](https://github.com/petersolopov/carbonara)

Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
