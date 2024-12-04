let gameStarted = false;
let score = 0;
let prevScore = 0;
let nextLifeScore = 0;
let lives = 3;
let laserBank = 10;
let isFiring = false;
let lastFired = 0;

let globalAlpha = 1;

const canvas = document.getElementById('space-game');

function getScore() {
    return score;
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        initialize();
    }
}

function reloadGame() {
    location.reload();
}

function initialize() {
    let canvas = document.getElementById("space-game");
    let ctx = canvas.getContext("2d");
    let backgroundImage = new Image();
    backgroundImage.src = rocketWarsData.pluginUrl + "assets/icons/background-fit-canvas.png";
    let backgroundWidth = 1280;
    let backgroundHeight = 720;
    let backgroundY = 0;
    let backgroundX = 0;
    let backgroundSpeed = 0.5;
    let backgroundAlpha = 1.0;
    let fadeSpeed = 0.01;
    let rocketImage = new Image();
    rocketImage.src = rocketWarsData.pluginUrl + "assets/icons/rocket.png";
    let rocketWidth = 128;
    let rocketHeight = 73;
    let rocketX = 200;
    let rocketY = canvas.height / 2 - rocketImage.height / 2;
    let rocketSpeed = 5;
    let laserImage = new Image();
    laserImage.src = rocketWarsData.pluginUrl + "assets/icons/laser.png";
    let laserWidth = 60;
    let laserHeight = 10;
    let laserSpeed = 20;
    let laserX = rocketX + rocketWidth;
    let laserY = rocketY + rocketHeight / 2 - laserHeight / 2;
    let ufoImage = new Image();
    ufoImage.src = rocketWarsData.pluginUrl + "assets/icons/ufo.png";
    let ufoWidth = 128;
    let ufoHeight = 65;
    let ufoSpeed = 5;
    let ufoX = canvas.width;
    let ufoY = Math.floor(Math.random() * (canvas.height - ufoHeight));
    let bigUfoImage = new Image();
    bigUfoImage.src = rocketWarsData.pluginUrl + "assets/icons/bigUfo.png";
    let bigUfoWidth = 192;
    let bigUfoHeight = 101;
    let bigUfoX = canvas.width;
    let bigUfoY = Math.floor(Math.random() * (canvas.height - bigUfoHeight));
    let bigUfoSpeed = 3;
    let bigUfoHitImage = new Image();
    bigUfoHitImage.src = rocketWarsData.pluginUrl + "assets/icons/bigUfohit.png";
    let explodeImage = new Image();
    explodeImage.src = rocketWarsData.pluginUrl + "assets/icons/explode.png";
    let explodeWidth = 100;
    let explodeHeight = 76;
    let bigExplodeImage = new Image();
    bigExplodeImage.src = rocketWarsData.pluginUrl + "assets/icons/bigExplode.png";
    let bigExplodeWidth = 133;
    let bigExplodeHeight = 101;

    let threelivesImage = new Image();
    threelivesImage.src = rocketWarsData.pluginUrl + "assets/icons/livesThree.png";
    let twolivesImage = new Image();
    twolivesImage.src = rocketWarsData.pluginUrl + "assets/icons/livesTwo.png";
    let onelivesImage = new Image();
    onelivesImage.src = rocketWarsData.pluginUrl + "assets/icons/livesOne.png";
    let zerolivesImage = new Image();
    zerolivesImage.src = rocketWarsData.pluginUrl + "assets/icons/livesZero.png";

    let zeroLaserImage = new Image();
    zeroLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/zeroLaser.png";
    let oneLaserImage = new Image();
    oneLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/oneLaser.png";
    let twoLaserImage = new Image();
    twoLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/twoLaser.png";
    let threeLaserImage = new Image();
    threeLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/threeLaser.png";
    let fourLaserImage = new Image();
    fourLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/fourLaser.png";
    let fiveLaserImage = new Image();
    fiveLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/fiveLaser.png";
    let sixLaserImage = new Image();
    sixLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/sixLaser.png";
    let sevenLaserImage = new Image();
    sevenLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/sevenLaser.png";
    let eigthLaserImage = new Image();
    eigthLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/eigthLaser.png";
    let nineLaserImage = new Image();
    nineLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/nineLaser.png";
    let tenLaserImage = new Image();
    tenLaserImage.src = rocketWarsData.pluginUrl + "assets/icons/tenLaser.png";

    let speedMultiplier = 1;

    // Definiere Seitenelemente
    selectDifficulty = document.getElementById('difficulty');
    addDifficulty = document.getElementById('addDifficulty');
    highscores = document.getElementById('highscores');
    highscoreListeEasy = document.getElementById('highscoreListe_Easy');
    highscoreListeNormal = document.getElementById('highscoreListe_Normal');
    highscoreListeHard = document.getElementById('highscoreListe_Hard');
    highscoreListEasy = document.getElementById('highscoreList_Easy');
    highscoreListNormal = document.getElementById('highscoreList_Normal');
    highscoreListHard = document.getElementById('highscoreList_Hard');
    startButton = document.getElementById('startButton');
    restartButton = document.getElementById('restartButton');

    // Definiere die Variablen, um den Status des Spiels zu verfolgen

    let isPaused = false;
    let isAnimating = true;
    let gameOver = false;
    let animationFrameId



    function updateSpeedMultiplier() {
        const difficultySelect = document.getElementById('difficulty');
        const selectedValue = difficultySelect.value;
        speedMultiplier = parseFloat(selectedValue);
    }

    updateSpeedMultiplier();

    function hideElements() {
        if (gameStarted) {
            selectDifficulty.hidden = true;
            addDifficulty.hidden = true;
            //highscores.hidden = true;
            highscoreListeEasy.hidden = true;
            highscoreListeNormal.hidden = true;
            highscoreListeHard.hidden = true;
            highscoreListEasy.hidden = true;
            highscoreListNormal.hidden = true;
            highscoreListHard.hidden = true;
            startButton.hidden = true;
            restartButton.hidden = false;
        }
    }

    hideElements();

    const rocket = {
        image: rocketImage,
        width: rocketWidth,
        height: rocketHeight,
        x: rocketX,
        y: rocketY,
        speed: rocketSpeed,

        // Methode zur Aktualisierung der Position der Rakete
        updatePosition: function () {
            // Überprüfe, ob die Rakete nach oben bewegt werden soll
            if (rocket.upPressed && this.y > 0) {
                this.y -= this.speed * speedMultiplier;

            }
            // Überprüfe, ob die Rakete nach unten bewegt werden soll
            if (rocket.downPressed && this.y < canvas.height - this.height) {
                this.y += this.speed * speedMultiplier;
            }
        },

        //Methode zur Zeichung der Position der Rakete
        draw: function () {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    const laser = {
        image: laserImage,
        width: laserWidth,
        height: laserHeight,
        speed: laserSpeed,
        x: laserX,
        y: laserY,

        draw: function () {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    const ufo = {
        image: ufoImage,
        width: ufoWidth,
        height: ufoHeight,
        speed: ufoSpeed,
        x: ufoX,
        y: ufoY,

        draw: function () {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    const bigUfo = {
        image: bigUfoImage,
        width: bigUfoWidth,
        height: bigUfoHeight,
        speed: bigUfoSpeed,
        x: bigUfoX,
        y: bigUfoY,
        hits: 0,

        draw: function () {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    const explode = {
        image: explodeImage,
        width: explodeWidth,
        height: explodeHeight,

        draw: function () {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    const bigExplode = {
        image: bigExplodeImage,
        width: bigExplodeWidth,
        height: bigExplodeHeight,

        draw: function () {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    let lasers = []; // Array zum Speichern der abgefeuerten Laser
    let ufos = []; // Array zum Speichern der einfliegenden ufos
    let bigUfos = []; // Array zum Speichern der einfliegenden bigUfos
    let explosions = []; // Array zum Speichern der Explosion
    let bigExplosions = []; // Array zum Speichern der bigExplosion

    // Setze anfängliche Werte für die Tasten
    rocket.upPressed = false;
    rocket.downPressed = false;

    // Bewege das Raumschiff nach oben oder unten, wenn die entsprechenden Pfeiltasten gedrückt werden
    document.addEventListener("keydown", function (event) {
        if (event.key === 'ArrowUp') {
            rocket.upPressed = true;
        }
        if (event.key === 'ArrowDown') {
            rocket.downPressed = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowUp') {
            rocket.upPressed = false;
        }
        if (event.key === 'ArrowDown') {
            rocket.downPressed = false;
        }
    });

    // Wenn die Leertaste gedrückt wird, setze das isFiring-Flag auf true, um den Laser zu feuern
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" && !isFiring && laserBank > 0) {
            fireLaser();
            isFiring = true;
            laserBank--
        }
    });

    // Wenn die Leertaste losgelassen wird, setze das isFiring-Flag auf false
    document.addEventListener("keyup", function (event) {
        if (event.code === "Space") {
            isFiring = false;
        }
    });

    function fireLaser() {
        // Aktualisiere die Startposition des Lasers, um sicherzustellen, dass er an der aktuellen Position des Raumschiffs abgefeuert wird
        laser.x = rocket.x + rocket.width;
        laser.y = rocket.y + rocket.height / 2 - laser.height / 2;

        // Erstelle ein neues Laserobjekt und füge es dem lasers-Array hinzu
        let newLaser = {
            x: laser.x,
            y: laser.y,
            width: laser.width,
            height: laser.height,
            speed: laser.speed
        };
        lasers.push(newLaser);

        // Setze das isFiring-Flag auf true, um den Laser zu feuern
        isFiring = true;
    }

    // Funktion zum Erstellen eines neuen UFOs
    function createUfo() {
        // Zufällige y-Position des UFOs
        let randomY = Math.floor(Math.random() * (canvas.height - ufoHeight));
        let newUfo = {
            x: canvas.width,
            y: randomY,
            width: ufoWidth,
            height: ufoHeight,
            image: ufoImage
        };
        ufos.push(newUfo);
    }

    // Erstelle ein neues UFO aller 1,5 bis 2,5 Sekunden
    function scheduleCreateUfo() {
        if (!isPaused) {
            setTimeout(function () {
                createUfo();
                scheduleCreateUfo();
            }, Math.floor((Math.random() * 1000) + 1500) / speedMultiplier);
        } else {
            setTimeout(scheduleCreateUfo, 100)
        }
    }

    scheduleCreateUfo();

    // Funktion zum Erstellen eines neuen bigUFOs
    function createbigUfo() {
        // Zufällige y-Position des UFOs
        let randomY = Math.floor(Math.random() * (canvas.height - bigUfoHeight));
        let newbigUfo = {
            x: canvas.width,
            y: randomY,
            width: bigUfo.width,
            height: bigUfo.height,
            image: bigUfo.image,
            hits: bigUfo.hits,
        };
        bigUfos.push(newbigUfo);
    }

    // Erstelle ein neues bigUFO aller 2,5 bis 5 Sekunden
    function scheduleCreatebigUfo() {
        if (!isPaused) {
            setTimeout(function () {
                createbigUfo();
                scheduleCreatebigUfo();
            }, Math.floor((Math.random() * 2500) + 2500) / speedMultiplier);
        } else {
            setTimeout(scheduleCreatebigUfo, 100)
        }
    }

    scheduleCreatebigUfo();

    // Blende explodeImage ein und nach 1,5 Sekunden wieder aus
    function showExplosion(x, y) {
        explosions.push({ x: x, y: y, time: Date.now() })
        ctx.drawImage(explodeImage, x, y);
        setTimeout(function () {
            for (let i = 0; i < explosions.length; i++) {
                if (Date.now() - explosions[i].time >= 1500) {
                    explosions.splice(i, 1);
                    i--;
                }
            }
        }, 1500);
    }

    // Blende bigExplodeImage ein und nach 2 Sekunden wieder aus
    function showbigExplosion(x, y) {
        bigExplosions.push({ x: x, y: y, time: Date.now() })
        ctx.drawImage(bigExplodeImage, x, y);
        setTimeout(function () {
            for (let i = 0; i < bigExplosions.length; i++) {
                if (Date.now() - bigExplosions[i].time >= 2000) {
                    bigExplosions.splice(i, 1);
                    i--;
                }
            }
        }, 2000);
    }

    // Prüfe auf Kollisionen von 2 Rechecken 
    function checkCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
            // Rechtecke überschneiden sich
            return true;
        } else {
            // Rechtecke überschneiden sich nicht
            return false;
        }
    }

    // Überprüfe, ob die P-Taste gedrückt wurde
    document.addEventListener("keydown", function (event) {
        if (event.key === 'p') {
            isPaused = !isPaused;
            checkPause();
        }
    })

    // Überprüfe, ob die Pause-Taste gedrückt wurde
    function checkPause() {
        if (isPaused) {
            cancelAnimationFrame(animationFrameId);
            isAnimating = false;
            ctx.fillStyle = 'orange';
            ctx.font = 'bold 50px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
        } else {
            if (!isAnimating) {
                animationFrameId = requestAnimationFrame(update);
                isAnimating = true;
            }
        }
    }

    // Prüfe Kollision Rocket mit Ufos
    function checkCollisionWithUfos() {
        for (let j = 0; j < ufos.length; j++) {
            const ufoX = ufos[j].x;
            const ufoY = ufos[j].y;
            if (checkCollision(rocket, ufos[j])) {
                // Kollision erkannt - entferne das UFO aus dem ufos-Array
                //ctx.clearRect(rocket.x, rocket.y, rocket.width, rocket.height);
                ufos.splice(j, 1);
                j--;
                showExplosion(ufoX, ufoY);
                showExplosion(rocket.x, rocket.y);
                lives--;
                prevScore = score;
                break;
            }
        }
    }

    // Prüfe Kollision Rocket mit bigUfos
    function checkCollisionWithbigUfos() {
        for (let j = 0; j < bigUfos.length; j++) {
            const bigUfoX = bigUfos[j].x;
            const bigUfoY = bigUfos[j].y;
            if (checkCollision(rocket, bigUfos[j])) {
                // Kollision erkannt - entferne das UFO aus dem ufos-Array
                //ctx.clearRect(rocket.x, rocket.y, rocket.width, rocket.height);
                bigUfos.splice(j, 1);
                j--;
                showbigExplosion(bigUfoX, bigUfoY);
                showExplosion(rocket.x, rocket.y);
                lives--;
                prevScore = score;
                break;
            }
        }
    }

    // Prüfe Kollision Ufos mit Lasern
    function checkCollisionUfosWithLasers() {
        for (let i = 0; i < lasers.length; i++) {
            for (let j = 0; j < ufos.length; j++) {
                if (checkCollision(lasers[i], ufos[j])) {
                    const ufoX = ufos[j].x;
                    const ufoY = ufos[j].y;
                    // Kollision erkannt - entferne das UFO und den Laser aus dem ufos- und lasers -Array
                    ufos.splice(j, 1);
                    lasers.splice(i, 1);
                    i--;
                    j--;
                    showExplosion(ufoX, ufoY);
                    score++;
                    break;
                }
            }
        }
    }

    // Prüfe Kollision bigUfos mit Lasern
    function checkCollisionbigUfoWithLasers() {
        let i, j;

        for (i = lasers.length - 1; i >= 0; i--) {
            let laser = lasers[i];
            let laserX = laser.x;
            let laserY = laser.y;

            for (j = bigUfos.length - 1; j >= 0; j--) {
                let bigUfo = bigUfos[j];
                let bigUfoX = bigUfo.x;
                let bigUfoY = bigUfo.y;

                if (laserX < bigUfoX + bigUfo.width &&
                    laserX + laser.width > bigUfoX &&
                    laserY < bigUfoY + bigUfo.height &&
                    laserY + laser.height > bigUfoY) {
                    // Kollision erkannt
                    if (bigUfo.hits === 1) {
                        // zweite Kollision erkannt - entferne den Laser und bigUfo aus den Arrays
                        lasers.splice(i, 1);
                        bigUfos.splice(j, 1);
                        // Zeige Explosion an
                        showbigExplosion(bigUfoX, bigUfoY);
                        // Erhöhe den Score um zwei
                        score += 2;
                    } else {
                        // erste Kollision erkannt - entferne den Laser aus dem lasers-Array
                        bigUfo.hits++;
                        lasers.splice(i, 1);
                        showExplosion(bigUfoX, bigUfoY);
                    }
                    break;
                }
            }
        }
    }


    // Funktion zum Aktualisieren der UFO-Positionen
    function updateUfos() {
        // Bewege jedes UFO im ufos-Array
        for (let i = 0; i < ufos.length; i++) {
            ufos[i].x -= ufo.speed * speedMultiplier;
        }

        // Zeichne jedes UFO im ufos-Array
        for (let i = 0; i < ufos.length; i++) {
            ctx.drawImage(ufo.image, ufos[i].x, ufos[i].y, ufo.width, ufo.height);
        }

        // Überprüfe, ob ein UFO den linken Rand des Canvas erreicht hat und reduziere den Score um eins
        for (let i = 0; i < ufos.length; i++) {
            if (ufos[i].x + ufo.width < 0) {
                ufos.splice(i, 1);
                i--;
                if (speedMultiplier === 1.25) {
                    score--;
                }
            }
        }
    }

    // Funktion zum Aktualisieren der bigUFO-Positionen
    function updatebigUfos() {
        // Bewege jedes bigUFO im ufos-Array
        for (let i = 0; i < bigUfos.length; i++) {
            bigUfos[i].x -= bigUfo.speed * speedMultiplier;
        }

        // Zeichne jedes bigUFO im ufos-Array
        for (let i = 0; i < bigUfos.length; i++) {
            if (bigUfos[i].hits === 1) {
                ctx.drawImage(bigUfoHitImage, bigUfos[i].x, bigUfos[i].y, bigUfo.width, bigUfo.height);
            } else {
                ctx.drawImage(bigUfo.image, bigUfos[i].x, bigUfos[i].y, bigUfo.width, bigUfo.height);
            }
        }

        // Überprüfe, ob ein bigUFO den linken Rand des Canvas erreicht hat und reduziere den Score um zwei
        for (let i = 0; i < bigUfos.length; i++) {
            if (bigUfos[i].x + bigUfo.width < 0) {
                bigUfos.splice(i, 1);
                i--;
                if (speedMultiplier === 1.25) {
                    score -= 2;
                } else if (speedMultiplier === 1.0) {
                    score--;
                }
            }
        }
    }

    // Funktion zum Aktualisieren der Laser-Positionen
    function updateLasers() {
        // Bewege jeden Laser im laser-Array
        for (let j = 0; j < lasers.length; j++) {
            lasers[j].x += laser.speed * speedMultiplier;
        }

        // Zeichne jeden Laser im lasers-Array
        for (let j = 0; j < lasers.length; j++) {
            ctx.drawImage(laser.image, lasers[j].x, lasers[j].y, laser.width, laser.height);
        }

        // Entferne alle Laser, die den rechten Rand des Canvas erreicht haben
        lasers = lasers.filter(function (laser) {
            return laser.x > -laser.width;
        });
    }

    // Funktion zum Zeichnen des bewegten Hintergrundbilds
    function drawBackground() {
        // Hintergrundbild bewegen
        backgroundX -= backgroundSpeed;

        // Hintergrundbild zeichnen
        ctx.globalAlpha = backgroundAlpha;
        ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);



        // Wenn das Hintergrundbild das Ende des Canvas erreicht hat, setze es wieder auf die rechte Seite
        if (backgroundX <= -backgroundWidth) {
            backgroundX = 0;
        }
    }

    // Funktion zum Zeichnen von "GAME OVER" im Canvas
    function drawGameOver() {
        setTimeout(() => {
            ctx.fillStyle = 'red'; // Farbe des Texts
            ctx.font = 'bolder 80px sans-serif'; // Schriftart und -größe
            ctx.textAlign = 'center'; // Ausrichtung des Texts (zentriert)
            ctx.textBaseline = 'middle'; // Baseline des Texts (vertikal zentriert)
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2); // Zeichne den Text "GAME OVER" in der Mitte des Canvas
        }, 0);
    }

    // Funktion zum Zeichnen des Scores im canvas
    function drawScore() {
        ctx.fillStyle = 'greenyellow'; // Farbe des Texts
        ctx.font = 'bold 50px Arial'; // Schriftart und -größe
        ctx.textAlign = 'right'; // Ausrichtung des Texts (rechtsbündig)
        ctx.textBaseline = 'bottom'; // Baseline des Texts (unten)
        ctx.fillText('Score: ' + score, canvas.width - 10, canvas.height - 10); // Zeichne den Text mit dem aktuellen Score   
    }

    function drawLives() {
        ctx.fillStyle = 'yellowgreen'; // Farbe des Texts
        ctx.font = 'bold 50px Arial'; // Schriftart und -größe
        ctx.textAlign = 'left'; // Ausrichtung des Texts (rechtsbündig)
        ctx.textBaseline = 'bottom'; // Baseline des Texts (unten)
        ctx.fillText('Lives:', 10, canvas.height - 10); // Zeichne den Text mit dem aktuellen Lives   
    }

    function drawLivesPics() {
        if (lives === 3) {
            ctx.drawImage(threelivesImage, 155, 660, 150, 50);
        } else if (lives === 2) {
            ctx.drawImage(twolivesImage, 155, 660, 150, 50);
        } else if (lives === 1) {
            ctx.drawImage(onelivesImage, 155, 660, 150, 50);
        } else if (lives === 0) {
            ctx.drawImage(zerolivesImage, 155, 660, 150, 50);
        }
    }

    function drawNextLive() {
        if (lives < 3 && score - prevScore === 0) {
            ctx.drawImage(zeroLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 1) {
            ctx.drawImage(oneLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 2) {
            ctx.drawImage(twoLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 3) {
            ctx.drawImage(threeLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 4) {
            ctx.drawImage(fourLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 5) {
            ctx.drawImage(fiveLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 6) {
            ctx.drawImage(sixLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 7) {
            ctx.drawImage(sevenLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 8) {
            ctx.drawImage(eigthLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 9) {
            ctx.drawImage(nineLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score - prevScore === 10) {
            ctx.drawImage(tenLaserImage, 325, 665, 160, 40);
        } else if (lives < 3 && score < prevScore) {
            ctx.drawImage(zeroLaserImage, 325, 665, 160, 40);
        }
    }

    function drawNextLifeScore() {
        if (lives < 3 && lives > 0) {
            ctx.fillStyle = 'orangered';
            ctx.font = '25px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText('New Life at Score: ' + nextLifeScore, 325, canvas.height - 10); // Zeichne den Text mit dem nextLifeScore   
        }
    }

    function drawLaserbank() {
        if (laserBank === 10) {
            ctx.drawImage(tenLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 9) {
            ctx.drawImage(nineLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 8) {
            ctx.drawImage(eigthLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 7) {
            ctx.drawImage(sevenLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 6) {
            ctx.drawImage(sixLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 5) {
            ctx.drawImage(fiveLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 4) {
            ctx.drawImage(fourLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 3) {
            ctx.drawImage(threeLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 2) {
            ctx.drawImage(twoLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 1) {
            ctx.drawImage(oneLaserImage, 165, 11, 160, 40);
        } else if (laserBank === 0) {
            ctx.drawImage(zeroLaserImage, 165, 11, 160, 40);
        }
    }

    function drawLaserbankText() {
        ctx.fillStyle = 'orangered';
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('Laser:', 10, +60);
    }

    function drawDiffcultiy() {
        const difficultySelect = document.getElementById('difficulty');
        const selectedValue = difficultySelect.value;
        if (selectedValue === '0.75') {
            ctx.fillStyle = 'green'; // Farbe des Texts
            ctx.font = 'bold 50px Arial'; // Schriftart und -größe
            ctx.textAlign = 'right'; // Ausrichtung des Texts (rechtsbündig)
            ctx.textBaseline = 'bottom'; // Baseline des Texts (unten)
            ctx.fillText('Easy', canvas.width - 10, + 60); // Zeichne den Schwirgkeitsgrad
        } else if (selectedValue === '1.0') {
            ctx.fillStyle = 'greenyellow'; // Farbe des Texts
            ctx.font = 'bold 50px Arial'; // Schriftart und -größe
            ctx.textAlign = 'right'; // Ausrichtung des Texts (rechtsbündig)
            ctx.textBaseline = 'bottom'; // Baseline des Texts (unten)
            ctx.fillText('Normal', canvas.width - 10, +60); // Zeichne den Schwirgkeitsgrad
        } else if (selectedValue === '1.25') {
            ctx.fillStyle = 'orange'; // Farbe des Texts
            ctx.font = 'bold 50px Arial'; // Schriftart und -größe
            ctx.textAlign = 'right'; // Ausrichtung des Texts (rechtsbündig)
            ctx.textBaseline = 'bottom'; // Baseline des Texts (unten)
            ctx.fillText('Hard', canvas.width - 10, +60); // Zeichne den Schwirgkeitsgrad
        }
    }

    function checkHighscores(score) {
        if (speedMultiplier === 0.75) {
            const highscores_Easy = JSON.parse(localStorage.getItem('highscores_Easy')) || [];
            const minHighscore_Easy = highscores_Easy.length >= 10 ? highscores_Easy[9].score : 0;

            if (score > minHighscore_Easy) {
                const highscoreForm_Easy = document.getElementById('highscoreForm_Easy');
                const highscore_Easy = document.getElementById('highscore_Easy');
                const highscoreListeEasy = document.getElementById('highscoreListe_Easy');
                const highscoreListEasy = document.getElementById('highscoreList_Easy');
                highscoreForm_Easy.hidden = false;
                highscore_Easy.hidden = false;
                highscoreListeEasy.hidden = false;
                highscoreListEasy.hidden = false;
            }
        } else if (speedMultiplier === 1.0) {
            const highscores_Normal = JSON.parse(localStorage.getItem('highscores_Normal')) || [];
            const minHighscore_Normal = highscores_Normal.length >= 10 ? highscores_Normal[9].score : 0;

            if (score > minHighscore_Normal) {
                const highscoreForm_Normal = document.getElementById('highscoreForm_Normal');
                const highscore_Normal = document.getElementById('highscore_Normal');
                const highscoreListeNormal = document.getElementById('highscoreListe_Normal');
                const highscoreListNormal = document.getElementById('highscoreList_Normal');
                highscoreForm_Normal.hidden = false;
                highscore_Normal.hidden = false;
                highscoreListeNormal.hidden = false;
                highscoreListNormal.hidden = false;
            }
        } else if (speedMultiplier === 1.25) {
            const highscores_Hard = JSON.parse(localStorage.getItem('highscores_Hard')) || [];
            const minHighscore_Hard = highscores_Hard.length >= 10 ? highscores_Hard[9].score : 0;

            if (score > minHighscore_Hard) {
                const highscoreForm_Hard = document.getElementById('highscoreForm_Hard');
                const highscore_Hard = document.getElementById('highscore_Hard');
                const highscoreListeHard = document.getElementById('highscoreListe_Hard');
                const highscoreListHard = document.getElementById('highscoreList_Hard');
                highscoreForm_Hard.hidden = false;
                highscore_Hard.hidden = false;
                highscoreListeHard.hidden = false;
                highscoreListHard.hidden = false;
            }
        }
    }

    /*
    function checkHighscores(score) {
        let difficulty = '';
        if (speedMultiplier === 0.75) {
            difficulty = 'Easy';
        } else if (speedMultiplier === 1.0) {
            difficulty = 'Normal';
        } else if (speedMultiplier === 1.25) {
            difficulty = 'Hard';
        }

        if (difficulty) {
            jQuery.ajax({
                url: rocketWarsData.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'load_highscores',
                    security: rocketWarsData.nonce,
                    difficulty: difficulty
                },
                success: function (response) {
                    if (response.success && response.data.length >= 10) {
                        const minHighscore = response.data[response.data.length - 1].score;

                        if (score > minHighscore) {
                            const formId = `highscoreForm_${difficulty}`;
                            const elementsToShow = [
                                formId,
                                `highscore_${difficulty}`,
                                `highscoreListe_${difficulty}`,
                                `highscoreList_${difficulty}`
                            ];

                            elementsToShow.forEach(id => {
                                const element = document.getElementById(id);
                                if (element) {
                                    element.hidden = false;
                                }
                            });
                        }
                    }
                },
                error: function (error) {
                    console.error('Error fetching highscores:', error);
                }
            });
        }
    }*/

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update(currentTime) {
        clearCanvas();

        lastTime = currentTime;
        const deltaTime = (currentTime - lastTime) / 1000; // Berechne die vergangene Zeit seit dem letzten Frame in Sekunden

        // Laserbank jede Sekunde um 1 erhöhen
        if (currentTime - lastFired >= 1000 && laserBank < 10) {
            laserBank++;
            lastFired = currentTime;
        }

        drawBackground();

        // Leben auf Maximal 3 um eins erhöhen wenn der score um 10 seit dem letztem Treffer gestiegen ist
        if (score >= prevScore + 10 && lives < 3) {
            lives++;
            prevScore = score;
        }

        drawDiffcultiy();

        drawScore();

        drawLives();

        drawLivesPics();

        //drawNextLive();

        drawNextLifeScore();

        drawLaserbank();

        drawLaserbankText();

        // Überprüfe ob die Anzahl der Leben gleich Null ist
        if (lives <= 0) {
            gameOver = true;
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            checkHighscores(score);
            drawGameOver();
            return; // Beende die Funktion, wenn die Anzahl der Leben Null ist
        }

        // Überprüfe ob der Score negativ ist. Reduziere Lives um eins und setzte score auf 10
        if (score < 0) {
            lives--;
            score = 0;
            prevScore = 0;
        }

        // Überprüfe, ob das Spiel pausiert ist
        if (!isPaused) {
            // Aktualisiere die Position der Rakete
            rocket.updatePosition();

            // Zeichne die Rakete
            rocket.draw();

            // Aktualisiere die UFO-Positionen
            updateUfos();

            // Aktualisiere die bigUFO-Positionen
            updatebigUfos();

            // Aktualisiere die Laser-Positionen
            updateLasers();

            // Prüfe Kollision Ufos mit Lasern
            checkCollisionUfosWithLasers();

            // Prüfe Kollision bigUfos mit Lasern
            checkCollisionbigUfoWithLasers();

            // Prüfe Kollision Rocket mit Ufos
            checkCollisionWithUfos();

            // Prüfe Kollision Rocket mit bigUfos
            checkCollisionWithbigUfos();


            // Zeichne die Explosionen
            for (let i = 0; i < explosions.length; i++) {
                ctx.drawImage(explodeImage, explosions[i].x, explosions[i].y);
            }

            // Zeichne die bigExplosionen
            for (let i = 0; i < bigExplosions.length; i++) {
                ctx.drawImage(bigExplodeImage, bigExplosions[i].x, bigExplosions[i].y);
            }

            animationFrameId = requestAnimationFrame(update);
        } else {
            // Das Spiel ist pausiert, rufe update-Funktion nicht auf und warte auf Fortsetzung
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        nextLifeScore = prevScore + 10;
    }

    // Rufe die update-Funktion auf, um die Animation zu starten
    update();
}