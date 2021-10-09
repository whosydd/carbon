import axios from 'axios'
import * as dayjs from 'dayjs'
import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import config from './config'

export default async (file: object) => {
  // 获取配置项
  const { filename, domain, theme, rootPath, code } = config(file)
  let isDefault: boolean

  if (theme !== undefined && Object.keys(theme).length !== 0) isDefault = false
  else isDefault = true

  try {
    // 发送ajax请求
    const params = Object.assign({ code }, isDefault ? null : theme)
    const now = Date.now()
    const imgPath = path.resolve(
      rootPath,
      `carbon/${filename}-${dayjs(now).format('YYYY-MM-DD-HH-mm-ss')}.png`
    )
    const res = await axios.post(`https://${domain}/api/cook`, params, {
      responseType: 'arraybuffer',
    })
    if (!fs.existsSync(rootPath + '/carbon')) fs.mkdirSync(rootPath + '/carbon')
    fs.createWriteStream(imgPath).write(res.data)
    vscode.env.openExternal(vscode.Uri.file(imgPath))
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message)
  }
}
