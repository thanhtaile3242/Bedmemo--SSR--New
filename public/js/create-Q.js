const buttonAdd = document.getElementById("addQuestion");
const buttonSave = document.getElementById("SaveFolder");
let domParser = new DOMParser();
class Folder {
    folderName
    folderBio
    questionsArray
}
class Question_Answers {
    question
    answerA
    answerB
    answerC
    answerD
    rightAnswer
};
// Complete the default question form
(() => {
    let btnDelete_String = domParser.parseFromString(
        `<button type="button" style="position: absolute; right: 15px; top:5px">
            <i class="fa-solid fa-trash-can"></i>
        </button>`
        , "text/html");
    let btnDelete_Node = btnDelete_String.body.firstChild;
    btnDelete_Node.addEventListener("click", function () {
        // Remove the corresponding parent element.
        let parent = this.parentElement;
        parent.remove()
        // Update the order of questions.
        let labels_Array = document.querySelectorAll("span[class='countQ']");
        for (let i = 0; i < labels_Array.length; i++) {
            labels_Array[i].textContent = i + 1;
        }
        // Update attribute "name" of input radio
        let radio = document.querySelectorAll("input[type=radio]");
        const radio_Array = Array.from(radio);
        radio_Array.forEach(function (item, index) {
            const nameNumber = Math.floor(index / 4) + 1; // Calculate class number
            item.setAttribute("name", `RA${nameNumber}`); // Add class
        });
    });
    const QA1 = document.getElementsByClassName("form-Q");
    QA1[0].appendChild(btnDelete_Node);
})();
// ADD feature
buttonAdd.addEventListener("click", () => {
    let NumberQuestions = document.querySelectorAll("span[class='countQ']").length;
    let newQA_String = domParser.parseFromString(`
      <div class="form-Q" style="position: relative;">
            <div class="form-Q__number">
                <span class="countQ">${NumberQuestions +1}</span>
            </div>

            <div class="form-Q__question">
                <textarea class="question" name="q" cols="1" rows="2" placeholder="Start typing your question"
                        maxlength="100"></textarea>
            </div>

            <div class="form-Q__answers">
                <div class="answers__item">
                    <div class="item__choice choice--orange"><span>A</span></div>
                    <div class="item__content">
                            <textarea class="question" name="a" cols="1" rows="1" placeholder="Add answer"
                                maxlength="60"></textarea>
                            <input type="radio" class="question" name="RA${NumberQuestions + 1}" value="A">
                    </div>
                </div>

                <div class="answers__item">
                    <div class="item__choice choice--blue"><span>B</span></div>
                    <div class="item__content">
                            <textarea class="question" name="b" cols="1" rows="1" placeholder="Add answer"
                                maxlength="60"></textarea>
                            <input type="radio" class="question" name="RA${NumberQuestions + 1}" value="B">
                    </div>
                </div>

                <div class="answers__item">
                    <div class="item__choice choice--blue"><span>C</span></div>
                    <div class="item__content">
                            <textarea class="question" name="c" cols="1" rows="1" placeholder="Add answer"
                                maxlength="60"></textarea>
                            <input type="radio" class="question" name="RA${NumberQuestions + 1}" value="C">
                     </div>
                </div>

                <div class="answers__item">
                    <div class="item__choice choice--orange"><span>D</span></div>
                    <div class="item__content">
                            <textarea class="question" name="d" cols="1" rows="1" placeholder="Add answer"
                                maxlength="60"></textarea>
                            <input type="radio" class="question" name="RA${NumberQuestions + 1}" value="D">
                    </div>
                </div>

            </div>
       </div>
    `, "text/html");
    let newQA_Node = newQA_String.body.firstChild;
    // create button delete
    let btnDelete_String = domParser.parseFromString(
        `<button type="button" style="position: absolute; right: 15px; top:5px">
            <i class="fa-solid fa-trash-can"></i>
        </button>`
        , "text/html");
    let btnDelete_Node = btnDelete_String.body.firstChild;
    btnDelete_Node.addEventListener("click", function() {
        // Remove the corresponding parent element.
        let parent = this.parentElement;
        parent.remove()
        // Update the order of questions.
        let labels_Array = document.querySelectorAll("span[class='countQ']");
        for (let i = 0; i < labels_Array.length; i++){
            labels_Array[i].textContent = i + 1;}
        // Update attribute "name" of input radio
        let radio = document.querySelectorAll("input[type=radio]");
        const radio_Array = Array.from(radio);
        radio_Array.forEach(function (item, index) {
            const nameNumber = Math.floor(index / 4) + 1; // Calculate class number
            item.setAttribute("name",`RA${nameNumber}`); // Add class
        });
    });
    // add button delete into form QA
    newQA_Node.appendChild(btnDelete_Node);
    // Add
    let container = document.getElementById("rightSide__content");
    container.appendChild(newQA_Node);
});

// SAVE feature
buttonSave.addEventListener('click', function () {
    // 1. Update classes for all input elements
    const listOfInputs = document.getElementsByClassName(`question`); // Select all <p> elements
        // Convert paragraphs to an array using Array.from
    const inputsArray = Array.from(listOfInputs );
        // Iterate through the paragraphs and add classes based on the index
    inputsArray.forEach(function (item, index) {
        const classNumber = Math.floor(index / 9) + 1; // Calculate class number
        item.classList.add('q' + classNumber)}); // Add class
    // 2. Validate fulfillment of input elements
        // Create a list of questions
    let QA_Array = [];
        // Number of questions
    let NumberQuestions = document.querySelectorAll("span[class='countQ']").length;
        // Validate checked right answers (input[type="radio"])
    let radioInputs = document.querySelectorAll('input[type="radio"]');
    let countRadio = 0;
    let checkRadio = false;
        for(let i = 0; i < radioInputs.length; i++) {
            if(radioInputs[i].checked){
                countRadio += 1;
            }};
        if(countRadio === NumberQuestions){
        checkRadio = true}
        // Validate fulfill FolderInfo, Questions and Answers
    let allTextAreaTags = document.getElementsByTagName("textarea");
    let checkBlank = true;
        for(let i = 0; i < allTextAreaTags.length;i++){
            if(allTextAreaTags[i].value === ''){
                checkBlank = false}};
                
    // 3. Create a new folder object
        let folderName = document.getElementById("folderName").value;
        let folderBio = document.getElementById("folderBio").value;
        // Fill the properties of the folder object  
        let folder = new Folder();
        folder.folderName = folderName;
        folder.folderBio = folderBio;
        folder.questionsArray = [];
    // Get the form element
        let inputFolderString = document.getElementById("folderObject");
    // 4. Get data for each item_QA object
    if(checkBlank && checkRadio){
        for(let i = 0; i < NumberQuestions; i++) {
            let item_QA = new Question_Answers();
        // Get question and answers
            let question_Array = document.getElementsByClassName(`q${i + 1}`);
            item_QA.question = question_Array[0].value;
            item_QA.answerA = question_Array[1].value;
            item_QA.answerB = question_Array[3].value;
            item_QA.answerC = question_Array[5].value;
            item_QA.answerD = question_Array[7].value;
            // Get the right answer
            
            for (let k = 0; k < question_Array.length; k++){
                if(question_Array[k].checked){
                    item_QA.rightAnswer = question_Array[k].value;
                }
            }
            folder.questionsArray.push(item_QA)
        };
        // Print the result
        console.log(folder);
        // 5. Convert the folder object into string and then write it to the input tag
        let folderString = JSON.stringify(folder);
        inputFolderString.value = folderString;
        
    }else{
        inputFolderString.value = "";
    }


    // 
     const form = document.getElementById("form-main");
        form.onsubmit = function (event) {
            event.preventDefault();
            if (inputFolderString.value === "") {
                alert('Please fill out both input fields.');
            } else {
                alert("Your folder saved successfully");
                form.submit();
            }
        }
});
