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

export default (
  file: vscode.Uri
): Promise<{
  filename: string
  theme: string
  code: string
}> => {
  return new Promise(async (resolve, reject) => {
    try {
      // 获取文件名
      const filename = file.toString().split('/').pop()!

      // 获取配置项
      const theme: string = vscode.workspace.getConfiguration('carbon').get('theme')!

      // 获取选中代码块
      const editor = vscode.window.activeTextEditor!
      const {
        document: { lineAt, getText },
        selection: { start, end, active },
      } = editor
      const code = (
        start.isEqual(end) ? lineAt(active.line).text : getText(new vscode.Range(start, end))
      ).trim()

      if (!code.match(/\w+/)) throw new Error(`Selected code is empty, refusing to send to carbon.`)

      // TODO: 添加配置项，设定最大代码长度
      const maxCharacterLength = 1000
      if (code.length > maxCharacterLength) {
        throw new Error(
          `Selected code is longer than ${maxCharacterLength} characters, refusing to send to carbon.`
        )
      }

      resolve({
        filename,
        theme,
        code,
      })
    } catch (error: any) {
      vscode.window.showErrorMessage(error.message)
    }
  })
}
