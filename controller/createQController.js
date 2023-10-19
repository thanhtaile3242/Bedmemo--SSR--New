// Import Model
const { Folder, Question } = require('../model/folderQAModel');
module.exports = {
    // Get create_Q page
    getCreateQPage: (req, res) => res.render("create-Q.ejs"),
    // Post create_Q page
    postCreateQPage: (req, res) => {
     (async () => {
        let folderData = JSON.parse(req.body.folderObject)
        const questionDocuments = await Promise.all(folderData.questionsArray.map(async (question) => {
        const newQuestion = new Question(question);
        await newQuestion.save();
        return newQuestion;
        }));
  // Now, create the "Folder" document and reference the saved "Question" documents
  const folderDocument = new Folder({
    folderInfo: folderData.folderName,
    folderBio: folderData.folderBio,
    questionsArray: questionDocuments.map((q) =>q._id),
    });
        
    await folderDocument.save();
    console.log(folderDocument);
    })();
      res.redirect('manage');

    }
    
}