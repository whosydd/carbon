import * as vscode from 'vscode'
import carbon from './carbon'

export function activate(context: vscode.ExtensionContext) {
  let getImg = vscode.commands.registerCommand('carbon.getImg', carbon)

  context.subscriptions.push(getImg)
}

export function deactivate() {}
