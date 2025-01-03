const paragraphInput = document.getElementById("englishInput");
const turkishInput = document.getElementById("turkishInput");
const alertMessage = document.getElementById("alertMessage");
const addSentenceButton = document.getElementById("addButton");
const wordsDiv = document.getElementById("words");
const englishShowButton = document.getElementById("englishShowButton");
const turkishShowButton = document.getElementById("turkishShowButton");

let hidingButtonEnglish = false;
let hidingButtonTurkish = false;

window.addEventListener("load", function () {
  const savedWords = localStorage.getItem("words");
  if (savedWords) {
    const wordsArray = JSON.parse(savedWords);
    wordsArray.forEach((word) => addSentence(word.english, word.turkish));
  }
});

  addSentenceButton.addEventListener("click", function () {
  const englishWord = paragraphInput.value;
  const turkishWord = turkishInput.value;

  if (englishWord.trim() !== "" && turkishWord.trim() !== "") {
    if ((englishWord.length <= 12 && turkishWord.length <= 12)){
        addSentence(englishWord, turkishWord);
        saveSentencesToLocalStorage();
        wordsDiv.style.visibility = "visible";
        alertMessage.style.visibility = "hidden";
        paragraphInput.value = "";
        turkishInput.value = "";
    }else{
        alertMessage.textContent = "This Words Are Very Long.";
        alertMessage.style.visibility = "visible";
    }
  } else {
    alertMessage.textContent = "Please Enter All Inputs.";
    alertMessage.style.visibility = "visible";
  }
});

document.addEventListener("click", function (event) {
  if (event.target.id === "removeButton") {
  const removeTwoDiv = event.target.parentElement.parentElement;
  removeTwoDiv.remove();
  saveSentencesToLocalStorage();
  }
  if (wordsDiv.innerHTML.trim() === "") {
    wordsDiv.style.visibility = "hidden";
  }
  if(event.target.id == "englishShowButton"){
    if (hidingButtonEnglish == true){
      event.target.classList.add("showButtonAnimation");
      event.target.classList.remove("hideButtonAnimation");
      event.target.textContent = "Hide";
      hidingButtonEnglish = false;
      const englishWords = document.querySelectorAll(".englishWord");
      englishWords.forEach(word => {
        word.style.visibility = "visible";
      });
    }else{
      event.target.classList.remove("showButtonAnimation");
      event.target.classList.add("hideButtonAnimation");
      event.target.textContent = "Show";
      hidingButtonEnglish = true;
      const englishWords = document.querySelectorAll(".englishWord");
      englishWords.forEach(word => {
        word.style.visibility = "hidden";
      });

      if (hidingButtonTurkish == true){
        turkishShowButton.classList.add("showButtonAnimation");
        turkishShowButton.classList.remove("hideButtonAnimation");
        turkishShowButton.textContent = "Hide";
        hidingButtonTurkish = false;
        const turkishWords = document.querySelectorAll(".turkishWord");
        turkishWords.forEach(word => {
          word.style.visibility = "visible";
        });
      }
    }
  }else if(event.target.id == "turkishShowButton"){
    if (hidingButtonTurkish == true){
      event.target.classList.add("showButtonAnimation");
      event.target.classList.remove("hideButtonAnimation");
      event.target.textContent = "Hide";
      hidingButtonTurkish = false;
      const turkishWords = document.querySelectorAll(".turkishWord");
      turkishWords.forEach(word => {
        word.style.visibility = "visible";
      });
    }else{
      event.target.classList.remove("showButtonAnimation");
      event.target.classList.add("hideButtonAnimation");
      event.target.textContent = "Show";
      hidingButtonTurkish = true;
      const turkishWords = document.querySelectorAll(".turkishWord");
      turkishWords.forEach(word => {
        word.style.visibility = "hidden";
      });

      if (hidingButtonEnglish == true){
        englishShowButton.classList.add("showButtonAnimation");
        englishShowButton.classList.remove("hideButtonAnimation");
        englishShowButton.textContent = "Hide";
        hidingButtonEnglish = false;
        const englishWords = document.querySelectorAll(".englishWord");
        englishWords.forEach(word => {
          word.style.visibility = "visible";
        });
      }
    }
  }
});

function addSentence(englishWord, turkishWord) {
  const twoDiv = document.createElement("div");
  twoDiv.classList.add("two");

  const wordDiv = document.createElement("div");
  wordDiv.classList.add("word");

  const englishLabel = document.createElement("label");
  englishLabel.classList.add("englishWord");
  englishLabel.textContent = englishWord;

  const colonLabel = document.createElement("label");
  colonLabel.textContent = ":";
  colonLabel.classList.add("colon");

  const turkishLabel = document.createElement("label");
  turkishLabel.classList.add("turkishWord");
  turkishLabel.textContent = turkishWord;

  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("removeDiv");

  const deleteButton = document.createElement("img");
  deleteButton.classList.add("removeButton");
  deleteButton.src = "Images/remove.png";
  deleteButton.id = "removeButton";

  wordDiv.appendChild(englishLabel);
  wordDiv.appendChild(colonLabel);
  wordDiv.appendChild(turkishLabel);
  deleteDiv.appendChild(deleteButton);
  twoDiv.appendChild(wordDiv);
  twoDiv.appendChild(deleteDiv);
  wordsDiv.appendChild(twoDiv);
}

function saveSentencesToLocalStorage() {
  const words = [];
  wordsDiv.querySelectorAll(".two").forEach((twoDiv) => {
    const englishWord = twoDiv.querySelector(".englishWord").textContent;
    const turkishWord = twoDiv.querySelector(".turkishWord").textContent;
    words.push({ english: englishWord, turkish: turkishWord });
  });
  localStorage.setItem("words", JSON.stringify(words));
}