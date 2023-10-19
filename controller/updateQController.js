const { Folder, Question } = require('../model/folderQAModel');
module.exports = {
    getUpdatePage: async(req, res) => {
        let idFolder = req.query.id;
        let data = await Folder.findById(idFolder).populate('questionsArray');
        res.render('update-Q.ejs', {folderInfo: data});
    },
    postUpdateQPage: async (req, res) => {
        let folderID = req.body.folderId
        let folderNew = JSON.parse(req.body.folderObject);
        let folderOld = await Folder.findById(folderID).populate('questionsArray');
        let arrayNew = folderNew.questionsArray;
        let arrayOld = folderOld.questionsArray;
        // Xóa (Done)
        for (const itemOld of arrayOld) {
            let itemOldIdString = itemOld._id.toString();
            if (!arrayNew.some(item => item.id === itemOldIdString)) {
                // Step 1
                await Folder.findByIdAndUpdate(
                    { _id: folderID },
                    {
                        $pull: { questionsArray: { $in: [itemOldIdString] } }
                    },
                    {
                      new: true  
                    }
                )
                // Step 2
                await Question.deleteOne({
                    _id: {$in: [itemOldIdString]}
                })
            }
        }
        // 
        let newArray_id = [];
        // Update
        for (const item of arrayNew) {
      if (item.id) {
        const existingQuestion = await Question.findOne({ _id: item.id });
        if (existingQuestion) {
          const updateFields = {};
          for (const field in item) {
            if (field !== 'id' && existingQuestion[field] !== item[field]) {
              updateFields[field] = item[field];
            }
          }
          if (Object.keys(updateFields).length > 0) {
            await Question.updateOne({ _id: item.id }, { $set: updateFields });
          }
        } 
      } else {
        delete item.id;
        const newQuestion = new Question(item);
        await newQuestion.save();
          newArray_id.push(newQuestion._id);
          
          
      }
    }
        let folderOld2 = await Folder.findById(folderID);
        let questionsArray2 = folderOld2.questionsArray || [];

        newArray_id.forEach(item => {
            questionsArray2.push(item._id)
        }) 

        folderOld2.questionsArray = questionsArray2;
        await folderOld2.save();
        res.redirect('manage');
  },
    
  getDeletePage: async (req, res) => {
    const folderID = req.body.folderId;
    const deletedFolder = await Folder.findOne({ _id: folderID });
    const relatedIds = deletedFolder.questionsArray.map(id => id.toString());
    await Question.deleteMany({ _id: { $in: relatedIds } });
    await Folder.deleteOne({_id: folderID})
    res.redirect('manage');
    }


}