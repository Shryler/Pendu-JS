const divLetters = document.querySelector("#letters");


// Création automatique des lettres
function generateLetterButton(divLetters) {
    const ul_element = document.createElement("div");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter => {
        const li_element = document.createElement("button");
        ul_element.className = ("tabDiv")
        li_element.classList.add("m-1");
        li_element.setAttribute("data-activ", "1");
        li_element.textContent = letter;
        li_element.addEventListener("click", () => checkIfLetterIsInTheWord(event), { once: true });
        ul_element.appendChild(li_element);
    });
    divLetters.appendChild(ul_element);
}

generateLetterButton(divLetters);

// Function : Génération d'un mot
function generateChoice(words_list) {
    for (let i = words_list.length - 1; i > 0; i--) {
        words_list[i] = words_list[i].toUpperCase();
        const j = Math.floor(Math.random() * (i + 1));
        [words_list[i], words_list[j]] = [words_list[j], words_list[i]];
    }
    console.log(words_list[0]);
    return words_list[0];
}

let wordSelected = generateChoice(words_list);

// Remplacer mot par _ _ _ 
function searchWord() {
    let hiddenWord = wordSelected.slice().replace(/[A-z]/g, '_');
    hideWord.textContent = hiddenWord;
    return hiddenWord.split('');
}

let hiddenWord = searchWord();
console.log(hiddenWord);


// Récupération Image
let imgDiv = document.querySelector("img");

// Compteur Erreur
let error = 0;

function restart(){
    let createBtnSubmit = document.createElement("button");
    createBtnSubmit.setAttribute("type", "submit");
    createBtnSubmit.className = ("mt-2");
    createBtnSubmit.textContent = "Recommencez";
    letters.append(createBtnSubmit);
    createBtnSubmit.addEventListener("click", () => location.reload());
}

function checkIfLetterIsInTheWord(event) {
    const selected_letter = event.target.textContent;
    const letter_press = event.target;
    console.log(wordSelected);
    if (wordSelected.includes(selected_letter)) {
        wordSelected.split('').forEach((letter, index) => {
            if (letter === selected_letter) {
                hiddenWord[index] = selected_letter;
            }
        });
        if (!hiddenWord.includes("_")) {
            msgInfo.textContent = `Bravo, vous avez réussi à trouver le mot ! Vous avez fait ${error} erreur(s)`;
            img.classList.add("d-none");
            iframe.classList.replace("d-none", "d-block");
            let recupButton = document.querySelectorAll("button[data-activ='1']");
            for (let i = 0; i < recupButton.length; i++) {
                recupButton[i].setAttribute("disabled", "");
            }
            restart();
        }
        letter_press.setAttribute("disabled", "");
        hideWord.textContent = hiddenWord.join('');
        
    } else {
        error++;
        letter_press.setAttribute("disabled", "");
        if (error <= 13) {
            imgDiv.src = `./img/${error}.png`;
        } 
        if (error >= 13) {
            msgInfo.innerHTML = `Dommage, vous avez perdu ! Il fallait deviner le mot : <strong>${wordSelected}</strong>`;
            img.classList.add("d-none");
            looser.classList.replace("d-none", "d-block");
            let recupButton = document.querySelectorAll("button[data-activ='1']");
            for (let i = 0; i < recupButton.length; i++) {
                recupButton[i].setAttribute("disabled", "");
            }
            restart();
        }
    }
}
