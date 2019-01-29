const vscode = require('vscode');
const fs = require('fs-extra');
const replace = require('replace-in-file');

function activate(context) {
    let cPath,
        cName = 'Name',
        cCategory = 'Category',
        cTemplate = context.extensionPath + "/component/";

    let disposable = vscode.commands.registerCommand('extension.buildAEMComponent',function() {
        vscode.window.showInputBox({ //Component path
            value: '',
            prompt: 'Please enter/paste absolute path (i.e: /Users/etc...) and not the related path (/<project>/etc...) to the desired Component\'s folder.',
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
        let cNameHyphens,
            folder,
            mkUpFilePath;

        if (cName.indexOf(' ') > -1){
            cNameHyphens = replaceAll(cName,' ','-');
            folder = cPath + '/' + cNameHyphens;
            mkUpFilePath = folder + '/' + cNameHyphens + ".html";
        } else {
            folder = cPath + '/' + cName;
            mkUpFilePath = folder + '/' + cName + ".html";
        }

        if(!fs.existsSync(folder)){
            fs.copy(cTemplate,folder)
            .then(() => {
                fs.rename((folder + '/component.html'),mkUpFilePath,() => {
                    const nOptions = {
                        files: folder + '/.content.xml',
                        from: /stubName/g,
                        to: cName
                    };

                    replace(nOptions)
                    .then(() => {
                        const cOptions = {
                            files: folder + '/.content.xml',
                            from: /catName/g,
                            to: cCategory
                        };

                        replace(cOptions);
                    });
                });
            })
            .catch(err => vscode.debug.activeDebugConsole.appendLine(err));

            vscode.window.showInformationMessage(cName + " component created in the specified location.");
        } else {
            vscode.window.showInformationMessage("A component with that name already exists.");
        }
    }

    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    context.subscriptions.push(disposable);
}

exports.activate = activate;
