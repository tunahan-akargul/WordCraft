const englishInput = document.getElementById("englishInput");
const turkishInput = document.getElementById("turkishInput");
const alertMessage = document.getElementById("alertMessage");
const addWordButton = document.getElementById("addButton");
const wordsDiv = document.getElementById("words");

window.addEventListener("load", function () {
  const savedWords = localStorage.getItem("words");
  if (savedWords) {
    const wordsArray = JSON.parse(savedWords);
    wordsArray.forEach((word) => addWord(word.english, word.turkish));
  }
});

addWordButton.addEventListener("click", function () {
  const englishWord = englishInput.value;
  const turkishWord = turkishInput.value;

  if (englishWord.trim() !== "" && turkishWord.trim() !== "") {
    if ((englishWord.length <= 12 && turkishWord.length <= 12)){
        addWord(englishWord, turkishWord);
        saveWordsToLocalStorage();
        wordsDiv.style.visibility = "visible";
        alertMessage.style.visibility = "hidden";
        englishInput.value = "";
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
    saveWordsToLocalStorage();
  }
  if (wordsDiv.innerHTML.trim() === "") {
    wordsDiv.style.visibility = "hidden";
  }
});

function addWord(englishWord, turkishWord) {
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

function saveWordsToLocalStorage() {
  const words = [];
  wordsDiv.querySelectorAll(".two").forEach((twoDiv) => {
    const englishWord = twoDiv.querySelector(".englishWord").textContent;
    const turkishWord = twoDiv.querySelector(".turkishWord").textContent;
    words.push({ english: englishWord, turkish: turkishWord });
  });
  localStorage.setItem("words", JSON.stringify(words));
}