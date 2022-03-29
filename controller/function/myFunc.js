const models = require('../../models/index');
const path = require('path');
const fs = require('fs-extra');

exports.uploadFile = async (files, doc, doc_id, path_, lang) => {
  if (files != null) {
    var fileExtension = files.originalFilename.split('.')[1];
    console.log(fileExtension);
    doc = `${doc_id}_${lang}.${fileExtension}`;

    var newPath = path.resolve('public/images') + path_ + '/' + doc;
    console.log(newPath);

    if (fs.exists(newPath)) {
      await fs.remove(newPath);
    }

    await fs.moveSync(files.filepath, newPath);
    // console.log("##########5555555")
    return doc;
  }
};
exports.deleteFile = async (path, img) => {
  let result = await fs.remove(path + img);
  return result;
};