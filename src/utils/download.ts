import axios from 'axios'
import * as dayjs from 'dayjs'
import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import config from './config'

export default async (file: vscode.Uri) => {
  // 获取配置项
  const { filename, theme, code } = await config(file)

  // 获取 domain
  const domain: string = await vscode.workspace.getConfiguration('carbon').get('domain')!

  // 获取工作区目录
  let rootPath = ''
  const workspace = vscode.workspace.workspaceFolders
  if (workspace === undefined) throw new Error('Please open a workspace')
  // 如果工作区中存在的多个文件夹，显示选择框
  if (workspace.length > 1) {
    const pick = await vscode.window.showWorkspaceFolderPick()
    if (!pick) return
    rootPath = pick.uri.fsPath
  } else {
    const pick = workspace[0]
    rootPath = pick.uri.fsPath
  }
  const now = Date.now()
  const imgPath = path.resolve(
    rootPath,
    `carbon/${filename}-${dayjs(now).format('YYYY-MM-DD-HH-mm-ss')}.png`
  )

  vscode.window.withProgress({ location: vscode.ProgressLocation.Notification }, async progress => {
    progress.report({ message: 'Downloading ...' })
    try {
      // 发送ajax请求
      const res: any = await axios.post(
        `https://${domain}/api`,
        // `http://localhost:3000/api`,
        { code, theme },
        {
          timeout: 15 * 1000,
          responseType: 'arraybuffer',
        }
      )

      // save
      if (res.status === 200) {
        if (!fs.existsSync(rootPath + '/carbon')) fs.mkdirSync(rootPath + '/carbon')
        fs.writeFileSync(imgPath, res.data)
        vscode.window.showInformationMessage('Success!')
      }

      // open
      const isOpen: boolean = await vscode.workspace.getConfiguration('carbon').get('openImg')!
      if (isOpen) {
        vscode.env.openExternal(vscode.Uri.file(imgPath))
      }
    } catch (err: any) {
      if (err.message.includes(504)) {
        vscode.window.showErrorMessage('Timeout, Please Try Again!')
        return
      }
      vscode.window.showErrorMessage(err.message)
    }
  })
}
