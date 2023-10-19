const { Folder, Question } = require('../model/folderQAModel');
module.exports = {
    getManagePage: async(req, res) => {
        let data = await Folder.find({}); 
        res.render('manage.ejs',{listFolders: data});
    }
}