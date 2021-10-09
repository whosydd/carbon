import * as vscode from 'vscode'
import download from './utils/download'
import openWeb from './utils/openWeb'

export function activate(context: vscode.ExtensionContext) {
  let dl = vscode.commands.registerCommand('carbon.download', download)
  let open = vscode.commands.registerCommand('carbon.openWeb', openWeb)

  context.subscriptions.push(dl, open)
}

export function deactivate() {}
