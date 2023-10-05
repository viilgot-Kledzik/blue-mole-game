document.addEventListener('DOMContentLoaded', (event) => {
    const scoreBoard = document.querySelector('#score');
    const moles = document.querySelectorAll('.mole');
    const gameBoard = document.querySelector('#game-board');
    const startBtn = document.querySelector('#startBtn');
    const resetBtn = document.querySelector('#resetBtn');
    let lastMole;
    let timeUp = false;
    let score = 0;

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomMole(moles) {
        const idx = Math.floor(Math.random() * moles.length);
        const mole = moles[idx];
        if (mole === lastMole) {
            return randomMole(moles);
        }
        lastMole = mole;
        return mole;
    }

    function peep() {
        const time = randomTime(200, 1000);
        const mole = randomMole(moles);
        mole.classList.add('up');
        setTimeout(() => {
            mole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        resetGame();
        peep();
        setTimeout(() => timeUp = true, 10000)
    }

    function whack(e) {
        score++;
        this.parentNode.classList.remove('up');
        scoreBoard.textContent = score;
    }

    function resetGame() {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
    }

    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    moles.forEach(mole => mole.addEventListener('click', whack));
});
