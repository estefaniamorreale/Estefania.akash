document.addEventListener('DOMContentLoaded', () => {
    const shuffleBtn = document.getElementById('shuffle-btn');
    const drawAgainBtn = document.getElementById('draw-again');
    const deckWrapper = document.getElementById('deck-wrapper');
    const deckElement = document.getElementById('deck');
    const resultContainer = document.getElementById('result-container');
    const cardMeaning = document.getElementById('card-meaning');

    let isShuffling = false;

    function drawMessage() {
        if (isShuffling) return;

        isShuffling = true;
        shuffleBtn.disabled = true;

        // Add shuffle animation to the deck
        deckElement.classList.add('shuffling');

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * soulMessages.length);
            const message = soulMessages[randomIndex];

            const icons = ["✨", "🕊️", "🤍", "🌟", "🕯️", "🔅", "🪐"];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];

            // Update UI
            document.getElementById('message-icon').textContent = randomIcon;
            cardMeaning.innerHTML = `<span style="font-style: italic;">"${message.text}"</span>${message.author ? `<br><br><small>— ${message.author}</small>` : ''}`;

            // Swap containers
            deckWrapper.classList.add('hidden');
            shuffleBtn.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            resultContainer.classList.add('fade-in');

            isShuffling = false;
        }, 1200);
    }

    function resetDeck() {
        resultContainer.classList.add('hidden');
        deckWrapper.classList.remove('hidden');
        shuffleBtn.classList.remove('hidden');
        deckElement.classList.remove('shuffling');
        shuffleBtn.disabled = false;
    }

    shuffleBtn.addEventListener('click', drawMessage);
    drawAgainBtn.addEventListener('click', resetDeck);


    // --- Cazador de Estrellas Game Logic ---
    const startGameBtn = document.getElementById('start-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const startScreen = document.getElementById('start-screen');
    const playScreen = document.getElementById('play-screen');
    const winScreen = document.getElementById('win-screen');
    const gameCanvas = document.getElementById('game-canvas');
    const energyBar = document.getElementById('energy-bar');
    const starMessage = document.getElementById('star-message');

    let gameInterval;
    let spawnInterval;
    let energy = 0;
    let isGameRunning = false;

    const positiveWords = ["Amor", "Paz", "Luz", "Fe", "Gozo", "Alma", "Vida", "Ser", "Dios", "Sol", "Bien", "Dar"];
    const negativeWords = ["Miedo", "Duda", "Ira", "Mal", "Ay", "No", "Ego", "Fin"];

    function startGame() {
        energy = 0;
        updateEnergy();
        isGameRunning = true;

        startScreen.classList.add('hidden');
        winScreen.classList.add('hidden');
        playScreen.classList.remove('hidden');

        spawnInterval = setInterval(spawnElement, 800);
        gameInterval = setInterval(gameLoop, 100);
    }

    function stopGame() {
        isGameRunning = false;
        clearInterval(spawnInterval);
        clearInterval(gameInterval);
        gameCanvas.innerHTML = ''; // Clear elements
    }

    function winGame() {
        stopGame();
        playScreen.classList.add('hidden');
        winScreen.classList.remove('hidden');

        // Pick a random message
        const randomIndex = Math.floor(Math.random() * soulMessages.length);
        const message = soulMessages[randomIndex];
        starMessage.innerHTML = `"${message.text}"<br><small>— ${message.author || 'Estefania Akash'}</small>`;
    }

    function updateEnergy() {
        energy = Math.max(0, Math.min(100, energy));
        energyBar.style.width = `${energy}%`;

        if (energy >= 100) {
            winGame();
        }
    }

    function spawnElement() {
        if (!isGameRunning) return;

        const isPositive = Math.random() > 0.3; // 70% positive
        const wordList = isPositive ? positiveWords : negativeWords;
        const text = wordList[Math.floor(Math.random() * wordList.length)];

        const el = document.createElement('div');
        el.classList.add('floating-element');
        el.classList.add(isPositive ? 'positive' : 'negative');
        el.textContent = text;

        // Random position
        const x = Math.random() * (gameCanvas.clientWidth - 60);
        el.style.left = `${x}px`;

        // Event listener
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPositive) {
                energy += 15;
                createBurst(e.target);
                el.remove();
            } else {
                energy -= 10;
                el.classList.add('shake'); // Optional shake visual
                el.style.color = 'red';
                setTimeout(() => el.remove(), 200);
            }
            updateEnergy();
        });

        // Animation End -> Remove
        el.addEventListener('animationend', () => {
            if (el.parentNode) el.remove();
        });

        // Add float animation class
        el.classList.add('float-up');

        gameCanvas.appendChild(el);
    }

    function createBurst(target) {
        // Simple visual feedback could be added here
        // For now, just removing is fine or adding a sound
    }

    function gameLoop() {
        // Optional: Check collisions or other logic
    }

    startGameBtn.addEventListener('click', startGame);
    restartGameBtn.addEventListener('click', startGame);
});


// Add shuffling CSS dynamically or in styles.css
const style = document.createElement('style');
style.textContent = `
    .shuffling {
        animation: deckShuffle 0.5s ease-in-out infinite;
    }
    @keyframes deckShuffle {
        0% { transform: translateX(0); }
        25% { transform: translateX(10px) rotate(2deg); }
        75% { transform: translateX(-10px) rotate(-2deg); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);
