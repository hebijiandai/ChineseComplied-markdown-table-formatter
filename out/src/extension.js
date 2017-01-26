'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var extract_tables_1 = require('./utils/extract-tables');
var reformat = require('reformat-markdown-table').reformat;
var TABLE_EXP = /((?:(?:[^\n]*?\|[^\n]*)\ *)?(?:\r?\n|^))((?:\|\ *(?::?-+:?|::)\ *|\|?(?:\ *(?::?-+:?|::)\ *\|)+)(?:\ *(?::?-+:?|::)\ *)?\ *\r?\n)((?:(?:[^\n]*?\|[^\n]*)\ *(?:\r?\n|$))+)/g;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('markdown', {
        provideDocumentFormattingEdits: function (document, options, token) {
            var result = [];
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            var range = new vscode.Range(start, end);
            var text = document.getText(range);
            var tables = extract_tables_1.default(text);
            if (tables) {
                tables.forEach(function (table) {
                    text = text.replace(TABLE_EXP, function (substring) { return reformat(table); });
                    result.push(new vscode.TextEdit(range, text));
                });
            }
            return result;
        }
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map