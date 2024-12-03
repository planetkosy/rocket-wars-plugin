document.getElementById('highscoreForm_Easy').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name_Easy').value;
    const score = getScore(); // Funktion aus deinem Spiel
    saveHighscore('Easy', name, score); // Speichern über AJAX
});

document.getElementById('highscoreForm_Normal').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name_Normal').value;
    const score = getScore(); // Funktion aus deinem Spiel
    saveHighscore('Normal', name, score); // Speichern über AJAX
});

document.getElementById('highscoreForm_Hard').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name_Hard').value;
    const score = getScore(); // Funktion aus deinem Spiel
    saveHighscore('Hard', name, score); // Speichern über AJAX
});

// Highscore speichern
function saveHighscore(difficulty, name, score) {
    jQuery.ajax({
        url: rocketWarsData.ajaxUrl,
        method: 'POST',
        data: {
            action: 'save_highscore',
            security: rocketWarsData.nonce,
            difficulty: difficulty,
            name: name,
            score: score
        },
        success: function (response) {
            if (response.success) {
                console.log('Highscore gespeichert!');
            } else {
                console.error(response.data);
            }
        }
    });
}

// Highscores abrufen
function loadHighscores(difficulty) {
    jQuery.ajax({
        url: rocketWarsData.ajaxUrl,
        type: 'POST',
        data: {
            action: 'load_highscores',
            security: rocketWarsData.nonce,
            difficulty: difficulty
        },
        success: function(response) {
            if (response.success) {
                updateHighscoreList(difficulty, response.data);
            } else {
                console.error('Error loading highscores:', response.data);
            }
        },
        error: function(error) {
            console.error('AJAX error:', error);
        }
    });
}

function updateHighscoreList(difficulty, highscores) {
    const listElement = document.getElementById(`highscoreList_${difficulty}`);
    listElement.innerHTML = ''; // Liste leeren

    highscores.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
        listElement.appendChild(listItem);
    });
}