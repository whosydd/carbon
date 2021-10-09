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

  if (!code.match(/\w+/)) throw new Error(`Selected code is empty, refusing to send to carbon.`)

  const maxCharacterLength = 1000
  if (code.length > 1000) {
    throw new Error(
      `Selected code is longer than ${maxCharacterLength} characters, refusing to send to carbon.`
    )
  }

  return {
    filename,
    domain,
    theme,
    rootPath,
    code,
  }
}
