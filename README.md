# Carbon

## Usage

### Download PNG

默认会通过发送`ajax`请求获取图片，保存到项目根目录的`carbon`文件夹，然后通过默认程序打开图片

![download PNG](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092119154.gif)

### Open in carbon.now.sh

![open-in-web](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092119234.gif)

## Configuration

如果你不想使用扩展预设的主题，可以选择自己配置，简单的方式是直接从 [carbon.now.sh](https://carbon.now.sh/) 中导出

![export-config](https://raw.githubusercontent.com/whosydd/images-in-one/main/202110092129742.png)

```json
// default
"carbon.theme": {
    "paddingVertical": "56px",
    "paddingHorizontal": "56px",
    "backgroundImage": null,
    "backgroundImageSelection": null,
    "backgroundMode": "color",
    "backgroundColor": "rgba(171, 184, 195, 1)",
    "dropShadow": true,
    "dropShadowOffsetY": "20px",
    "dropShadowBlurRadius": "68px",
    "theme": "dracula-pro",
    "windowTheme": "none",
    "language": "auto",
    "fontFamily": "Droid Sans Mono",
    "fontSize": "14px",
    "lineHeight": "133%",
    "windowControls": true,
    "widthAdjustment": true,
    "lineNumbers": false,
    "firstLineNumber": 1,
    "exportSize": "2x",
    "watermark": false,
    "squaredImage": false,
    "hiddenCharacters": false,
    "name": "",
    "width": 680
  }
```

#### Domain

由于是通过`ajax`获取图片，domain 默认使用[[petersolopov/carbonara](https://github.com/petersolopov/carbonara)提供的`carbonara-42.herokuapp.com`，如果你想自己配置 domain，可以选择[fork](https://github.com/petersolopov/carbonara)此仓库自行搭建服务器（例如可以使用[vercel](https://vercel.com/)部署），然后配置以下选项

```json
"carbon.domain": "carbonara-42.herokuapp.com" // default
```

### Default theme

如果你只想使用网站的默认主题，那么可以选择将以下配置项设置为`true`，默认为`false`

```json
"carbon.isDefaultTheme": false // default
```

## Thanks

[carbon-now-sh](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh)

[petersolopov/carbonara](https://github.com/petersolopov/carbonara)

Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
