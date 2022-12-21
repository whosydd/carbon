import { URL } from 'url'
import * as vscode from 'vscode'
import config from './config'

export default async (file: vscode.Uri) => {
  //   // 获取配置项
  const { code } = await config(file)
  const url = new URL('https://carbon.now.sh/')
  // 替换 +
  let temp = code.replace(/\+/g, '%2B')
  // 替换 &
  temp = temp.replace(/\&/g, '%26')
  url.searchParams.set('code', temp)
  vscode.env.openExternal(vscode.Uri.parse(url.href))
}
