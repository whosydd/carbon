import axios from 'axios'
import * as dayjs from 'dayjs'
import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import config from './config'

export default async (file: vscode.Uri) => {
  try {
    // 获取配置项
    const { filename, domain, theme, code } = await config(file)
    let isDefault: boolean

    if (theme !== undefined && Object.keys(theme).length !== 0) isDefault = false
    else isDefault = true

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

    // 发送ajax请求
    const params = Object.assign({ code }, isDefault ? null : theme)
    const now = Date.now()
    const imgPath = path.resolve(
      rootPath,
      `carbon/${filename}-${dayjs(now).format('YYYY-MM-DD-HH-mm-ss')}.png`
    )
    const res = await axios.post(`https://${domain}/api/cook`, params, {
      responseType: 'arraybuffer',
      timeout: 8 * 1000,
    })
    if (!fs.existsSync(rootPath + '/carbon')) fs.mkdirSync(rootPath + '/carbon')
    fs.createWriteStream(imgPath).write(res.data)
    vscode.window.showInformationMessage('Done')
    vscode.env.openExternal(vscode.Uri.file(imgPath))
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message)
  }
}
