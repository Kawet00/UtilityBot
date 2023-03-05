const fs = require("fs");
const FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/Interactions/Modals`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const ModalForms = require(File)
        if (ModalForms.ignore) return;
        else
        client.modalForms.set(ModalForms.name, ModalForms)
    });
}