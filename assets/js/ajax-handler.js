document.addEventListener('DOMContentLoaded', function() {
    // Setze den Standardwert im Dropdown-Menü
    const defaultDifficulty = 'Easy'; // ID der Standardoption
    const selectElement = document.getElementById('difficulty');
    selectElement.value = document.getElementById(defaultDifficulty).value;

    // Lade die Standard-Highscoreliste
    loadHighscores(defaultDifficulty);

    // Zeige nur die Standardliste an
    document.querySelectorAll('.highscore-list').forEach(list => list.hidden = true);
    document.getElementById(`highscoreList_${defaultDifficulty}`).hidden = false;
    document.getElementById(`highscoreListe_${defaultDifficulty}`).hidden = false;
});

document.getElementById('difficulty').addEventListener('change', function(event) {
    event.preventDefault();
    document.querySelectorAll('.highscore-list').forEach(list => list.hidden = true);

    const difficulty =  event.target.options[event.target.selectedIndex].id;

    loadHighscores(difficulty);
    document.getElementById(`highscoreList_${difficulty}`).hidden = false;
    document.getElementById(`highscoreListe_${difficulty}`).hidden = false;

})

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
			const highscore = document.getElementById(`highscore_${difficulty}`);
            const highscoreForm = document.getElementById(`highscoreForm_${difficulty}`);
			
            if (response.success) {
				highscore.hidden = true;
                highscoreForm.hidden = true;
                loadHighscores(difficulty);
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