function addLetter(letter) {
    let inputField = document.getElementById('inputText');
    inputField.value += letter;
}

function clearText() {
    document.getElementById('inputText').value = '';
}

async function reformulerTexte() {
    const userInput = document.getElementById('inputText').value;

    // Envoi de la requête à l'API de reformulation
    const response = await fetch('/reformuler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: userInput })
    });

    const data = await response.json();
    const outputText = document.getElementById('outputText');
    const outputTitle = document.getElementById('outputTitle');

    // Vérification du retour de l'API pour décider d'accepter ou reformuler le texte
    if (data.reformulated_text === userInput) {
        // Si le texte est identique à celui soumis, on considère qu'il est acceptable
        outputTitle.innerText = "Accepted";
        outputText.innerText = "Your text is good!";
    } else {
        // Sinon, on affiche le texte reformulé
        outputTitle.innerText = "Improved:";
        outputText.innerText = data.reformulated_text;
    }
}
