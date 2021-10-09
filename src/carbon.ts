import axios from 'axios'
import * as dayjs from 'dayjs'
import * as fs from 'fs'
import * as path from 'path'
import { URL } from 'url'
import * as vscode from 'vscode'

interface ThemeConfig {
  backgroundColor: string
  dropShadow: boolean
  dropShadowOffsetY: string
  dropShadowBlurRadius: string
  exportSize: string
  fontSize: string
  fontFamily: string
  firstLineNumber: number
  language: string
  lineHeight: string
  lineNumbers: boolean
  paddingVertical: string
  paddingHorizontal: string
  theme: string
  windowTheme: string
  windowControls: boolean
  widthAdjustment: boolean
  watermark: boolean
}

export default (file: Object) => {
  // 获取文件名
  const filename = file.toString().split('/').pop()

  // 获取配置项
  const config = vscode.workspace.getConfiguration('carbon')
  const domain: string | undefined = config.get('domain')
  const theme: ThemeConfig | undefined = config.get('theme')
  const isDefault: boolean | undefined = config.get('isDefaultTheme')

  // 获取项目根目录
  const workspace = vscode.workspace.workspaceFolders
  if (workspace === undefined) throw new Error(`Can't find ${workspace}`)
  const rootPath = workspace[0].uri.fsPath

  // 获取选中代码块
  const editor = vscode.window.activeTextEditor
  if (!editor) throw new Error('hello world!')
  const {
    document: { lineAt, getText },
    selection: { start, end, active },
  } = editor
  const code = (
    start.isEqual(end) ? lineAt(active.line).text : getText(new vscode.Range(start, end))
  ).trim()

  try {
    if (!code.match(/\w+/)) throw new Error(`Selected code is empty, refusing to send to carbon.`)

    const maxCharacterLength = 1000
    if (code.length > 1000) {
      throw new Error(
        `Selected code is longer than ${maxCharacterLength} characters, refusing to send to carbon.`
      )
    }

    const params = Object.assign({ code }, isDefault ? null : theme)

    // 发送ajax请求
    const res = axios.post(`https://${domain}/api/cook`, params, {
      responseType: 'arraybuffer',
    })

    vscode.window
      .showInformationMessage('How to deal with it?', 'Download PNG', 'Open in carbon.now.sh')
      .then(flag => {
        // 保存图片
        if (flag === 'Download PNG') {
          res
            .then(res => {
              const now = Date.now()
              const imgPath = path.resolve(
                rootPath,
                `carbon/${filename}-${dayjs(now).format('YYYY-MM-DD-HH-mm-ss')}.png`
              )
              if (!fs.existsSync(rootPath + '/carbon')) fs.mkdirSync(rootPath + '/carbon')
              fs.createWriteStream(imgPath).write(res.data)
              vscode.env.openExternal(vscode.Uri.file(imgPath))
            })
            .catch(err => vscode.window.showErrorMessage(err.message))
        }
        // 从网站打开
        if (flag === 'Open in carbon.now.sh') {
          const url = new URL('https://carbon.now.sh/')
          if (theme !== undefined) {
            url.searchParams.set('bg', theme.backgroundColor)
            url.searchParams.set('t', theme.theme)
            url.searchParams.set('wt', theme.windowTheme)
            url.searchParams.set('l', theme.language)
            url.searchParams.set('ds', theme.dropShadow.toString())
            url.searchParams.set('dsyoff', theme.dropShadowOffsetY)
            url.searchParams.set('dsblur', theme.dropShadowBlurRadius)
            url.searchParams.set('wc', theme.windowControls.toString())
            url.searchParams.set('wa', theme.widthAdjustment.toString())
            url.searchParams.set('pv', theme.paddingVertical)
            url.searchParams.set('ph', theme.paddingHorizontal)
            url.searchParams.set('ln', theme.lineNumbers.toString())
            url.searchParams.set('fl', theme.firstLineNumber.toString())
            url.searchParams.set('fm', theme.fontFamily)
            url.searchParams.set('fs', theme.fontSize)
            url.searchParams.set('lh', theme.lineHeight)
            url.searchParams.set('es', theme.exportSize)
            url.searchParams.set('wm', theme.watermark.toString())
            url.searchParams.set('code', code)

            vscode.env.openExternal(
              vscode.Uri.parse(
                isDefault ? `https://carbon.now.sh/?code=${encodeURIComponent(code)}` : url.href
              )
            )
          }
        }
      })
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message)
  }
}
