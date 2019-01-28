const vscode = require('vscode');
const fs = require('fs-extra');

function activate(context) {
    let cPath = '',
        cName = 'Name',
        cCategory = 'Category',
        cTemplate = context.extensionPath + "/component/";

    let disposable = vscode.commands.registerCommand('extension.buildAEMComponent', function() {
        vscode.window.showInputBox({ //Component path
            value: '',
            prompt: 'Please enter/paste absolute path (i.e: /Users/etc...) to the desired Component\'s folder.',
            validateInput: (value) => {
                if(!value || value.trim().length === 0) {
                    return 'Path cannot be empty.';
                }
                return null;
            }
        })
        .then((path) => {
            if ((path !== undefined || path.length > 0) && fs.existsSync(path)) {
                cPath = path;

                vscode.window.showInputBox({ //Component name
                    value: '',
                    prompt: 'Please enter the name of the desired component.',
                    placeHolder: 'Name',
                    validateInput: (value) => {
                        if(!value || value.trim().length === 0) {
                            return 'Name cannot be empty.';
                        }
                        return null;
                    }
                })
                .then((component) => {
                    if (component !== undefined || component.length > 0) {
                        cName = component;

                        vscode.window.showInputBox({ //Component category
                            value: '',
                            prompt: 'Please enter the category for this component',
                            placeHolder: 'Category',
                            validateInput: (value) => {
                                if(!value || value.trim().length === 0) {
                                    return 'Category cannot be empty.';
                                }
                                return null;
                            }
                        })
                        .then((category) => {
                            if (category !== undefined || category.length > 0) {
                                cCategory = category;
                                buildComponent();
                            };
                        });
                    }
                });
            } else {
                vscode.window.showInformationMessage("That directory path is not valid.");
            };
        });
    });

    let buildComponent = () => {
        let folder = cPath + '/' + cName;
        let mkUpFilePath = folder + '/' + cName + ".html";

        if(!fs.existsSync(folder)){
            fs.copy(cTemplate,folder)
            .then(function() {
                fs.renameSync((folder + '/component.html'),mkUpFilePath);
            })
            .catch(err => vscode.debug.activeDebugConsole.appendLine(err));

            vscode.window.showInformationMessage(cName + " component created in the specified location.");
        } else {
            vscode.window.showInformationMessage("A component with that name already exists.");

        }
    }

    context.subscriptions.push(disposable);
}

exports.activate = activate;
