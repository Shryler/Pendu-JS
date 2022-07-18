const divLetters = document.querySelector("#letters");


// Création automatique des lettres
function generateLetterButton(divLetters) {
    const ul_element = document.createElement("div");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter => {
        const li_element = document.createElement("button");
        ul_element.className = ("tabDiv")
        li_element.classList.add("m-1");
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
let error = 1;

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
        letter_press.setAttribute("disabled", "");
        hideWord.textContent = hiddenWord.join('');
        
    } else {
        console.log("NO");
        error++;
        letter_press.setAttribute("disabled", "");
        if (error < 15){
            imgDiv.src = `./img/${error}.png`;
        }
    }
}
