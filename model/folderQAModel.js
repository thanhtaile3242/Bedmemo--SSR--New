const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Bedmemo')
  .then(() => console.log('Connected!'))
    .catch((err) => console.log(err.message));
  
// Create folder schema
const folderSchema = new mongoose.Schema({
  folderInfo: String,
  folderBio: String,
  questionsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }]
});

const Folder = mongoose.model('folder', folderSchema);

// Create QA schema
const questionSchema = new mongoose.Schema({
  question: String,
  answerA: String,
  answerB: String,
  answerC: String,
  answerD: String,
  rightAnswer: {
    type: String,
    enum: ['A', 'B', 'C', 'D']
  },
  folderID: { type: mongoose.Schema.Types.ObjectId, ref: 'folder' }
});

const Question = mongoose.model('question', questionSchema);


module.exports = { Question, Folder };