
function populateSelectWithEnglishWords(selectElementId) {
    const words = JSON.parse(localStorage.getItem("words")) || [];
    const selectElement = document.getElementById(selectElementId);
  
    selectElement.innerHTML = "";

    const option = document.createElement("option");
    option.value = "Select a word";
    option.textContent = "Select a word";
    selectElement.appendChild(option);
  
    const option2 = document.createElement("option");
    option2.value = "Stereotyped";
    option2.textContent = "Stereotyped";
    selectElement.appendChild(option2);

    words.forEach((word) => {
      const option = document.createElement("option");
      option.value = word.english;
      option.textContent = word.english;
      selectElement.appendChild(option);
    });
  }

  populateSelectWithEnglishWords("mySelect");

const mySelect = document.getElementById("mySelect");
const paragraphInput = document.getElementById("paragraphInput");
const alertMessage = document.getElementById("alertMessage");
const addSentenceButton = document.getElementById("addButton");

window.addEventListener("load", function () {
    const savedSentences = localStorage.getItem("sentences");
  
    if (savedSentences) {
      const sentencesArray = JSON.parse(savedSentences);
  
      sentencesArray.forEach(({ sentenceTitle, sentences }) => {
        sentences.forEach((sentence) => addSentence(sentenceTitle, sentence));
      });
    }
  });
  

  addSentenceButton.addEventListener("click", function () {
  const selectValue = mySelect.value;
  const paragraphValue = paragraphInput.value;

  if (mySelect.value !== "Select a word") {
    if ((paragraphValue.trim() !== "")){
        addSentence(selectValue ,paragraphValue);
        saveSentencesToLocalStorage();
        alertMessage.style.visibility = "hidden";
        paragraphInput.value = "";
    }else{
        alertMessage.textContent = "Please Enter A Sentence";
        alertMessage.style.visibility = "visible";
    }
  } else {
    alertMessage.textContent = "Please Select A Word.";
    alertMessage.style.visibility = "visible";
  }
});

document.addEventListener("click", function (event) {
    if (event.target.id === "removeButton") {
        let wordsDiv;
        wordsDiv = event.target.parentElement.parentElement.parentElement;
        const removeTwoDiv = event.target.parentElement.parentElement;
        removeTwoDiv.remove();
        saveSentencesToLocalStorage();
        if (wordsDiv.innerHTML.length <= 100) {
            wordsDiv.remove();
        }
    }
});

function addSentence(select, sentence) {
    let wordsDiv = Array.from(document.querySelectorAll(".words")).find((div) => {
      const title = div.querySelector(".sentenceTitle");
      return title && title.textContent.trim() === select;
    });
  
    if (!wordsDiv) {
      wordsDiv = document.createElement("div");
      wordsDiv.classList.add("words");
  
      const sentenceTitleDiv = document.createElement("div");
      sentenceTitleDiv.classList.add("sentenceTitleDiv");
  
      const sentenceTitleLabel = document.createElement("label");
      sentenceTitleLabel.classList.add("sentenceTitle");
      sentenceTitleLabel.textContent = select;
  
      sentenceTitleDiv.appendChild(sentenceTitleLabel);
      wordsDiv.appendChild(sentenceTitleDiv);
  
      document.body.appendChild(wordsDiv);
    }
  
    const twoDiv = document.createElement("div");
    twoDiv.classList.add("two");
  
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word");
  
    const sentenceParagraph = document.createElement("p");
    sentenceParagraph.classList.add("sentence");
    sentenceParagraph.style.margin = "0";
    sentenceParagraph.textContent = sentence;
  
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("removeDiv");
  
    const deleteButton = document.createElement("img");
    deleteButton.classList.add("removeButton");
    deleteButton.src = "../Images/remove.png";
    deleteButton.id = "removeButton";
  
    wordDiv.appendChild(sentenceParagraph);
    deleteDiv.appendChild(deleteButton);
    twoDiv.appendChild(wordDiv);
    twoDiv.appendChild(deleteDiv);
    wordsDiv.appendChild(twoDiv);

    mySelect.value = "Select a word";
  }

  function saveSentencesToLocalStorage() {
    const sentences = [];
  
    // Tüm .words div'lerini gez
    document.querySelectorAll(".words").forEach((wordsDiv) => {
      const sentenceTitle = wordsDiv.querySelector(".sentenceTitle").textContent.trim();
      const sentencesArray = [];
  
      // Her .words içindeki tüm .sentence elemanlarını topla
      wordsDiv.querySelectorAll(".sentence").forEach((sentenceParagraph) => {
        sentencesArray.push(sentenceParagraph.textContent.trim());
      });
  
      // Başlık ve cümleleri bir objeye ekle
      sentences.push({ sentenceTitle, sentences: sentencesArray });
    });
  
    // localStorage'a kaydet
    localStorage.setItem("sentences", JSON.stringify(sentences));
  }