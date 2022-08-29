import { URL } from 'url'
import * as vscode from 'vscode'
import config from './config'

export default async (file: vscode.Uri) => {
  // 获取配置项
  const { theme, code } = await config(file)
  let isDefault: boolean

  const newCode = code.replace('+', '%2B')

  try {
    const url = new URL('https://carbon.now.sh/')

    if (theme !== undefined && Object.keys(theme).length !== 0) {
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
      url.searchParams.set('code', newCode)

      isDefault = false
    } else {
      isDefault = true
    }

    vscode.env.openExternal(
      vscode.Uri.parse(
        isDefault ? `https://carbon.now.sh/?code=${encodeURIComponent(newCode)}` : url.href
      )
    )
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message)
  }
}
