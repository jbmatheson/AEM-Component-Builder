const vscode = require('vscode');

function activate(context) {
    let cName = "Name";
    let catName = "Category";
    let disposable = vscode.commands.registerCommand('extension.buildAEMComponent', function () {
        vscode.window.showInputBox({
            value: "",
            prompt: "Please Enter the Name of the Desired Component",
            placeHolder: "Name",
            validateInput: (value) => {
                if(!value || value.trim().length === 0) {
                    return 'Cannot set empty Name';
                }
                return null;
            }
        })
        .then((info) => {
            if (info !== undefined && info.length > 0) {
                cName = info;
                vscode.window.showInformationMessage(cName);
                vscode.window.showInputBox({
                    value: '',
                    prompt: 'Please Enter the Category for this Component',
                    placeHolder: 'Category',
                    validateInput: (value) => {
                        if(!value || value.trim().length === 0) {
                            return 'Cannot set empty Category';
                        }
                        return null;
                    }
                })
                .then((info) => {
                    if (info !== undefined && info.length > 0) {
                        catName = info;
                        vscode.window.showInformationMessage(catName);
                    }
                    else {
                        vscode.window.showInformationMessage("Category is required");
                    }
                });
            } else {
                vscode.window.showInformationMessage("Component name is required");
            }
        });
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;
