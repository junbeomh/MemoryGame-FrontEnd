// DOM constants 
const gameGrid = document.getElementById("gameGrid");
const scoreBoard = document.getElementById("scoreBoard");
const score = document.getElementById("scoreNumValue");
const confirmModal = document.getElementById('confirmModal');
const welcome = document.querySelector('.welcome');
const summary = document.querySelector('.summary');
const gameDashboard = document.querySelector('.gameDashboard');
const gameBoard = document.getElementsByClassName('gameBoard')[0];

// const confirmQuit = document.querySelector('.confirmQuit');
// const confirmSubmit = document.querySelector('.confirmSubmit');
// const leaderboard = document.querySelector('.leaderboard');
// const gameMessage = document.getElementById("gameMessage");
const MAX_ROUNDS = 11;  // starting from zero


class Game {
    constructor() {
        this.grid = [];
        this.answers = [];
        this.totalScore = 0;
        this.currRound = 0;
        this.totalRounds = MAX_ROUNDS;
        this.level = new Level();
        this.x = 3;
        this.y = 3;
        this.totalClick = 0;
        this.numbAnswers = 3;
        this.mistake = false;
        this.isStarted = false;
    }

    reset = () => {
        this.level = new Level();
        this.grid = [];
        this.totalScore = 0;
        this.currRound = 0;
        this.totalRounds = 11;
        this.x = 3;
        this.y = 3;
        this.numbAnswers = 3;
        this.mistake = false;
        this.isStarted = false;
        this.clearGrid();
        console.log('cleargrid called');
        setTimeout(() => { this.beginGameRound(); }, 1000);
    }

    clearGrid = () => {
        this.answers = [];
        this.totalClick = 0;
        this.isStarted = true;
        this.mistake = false;
        gameGrid.innerHTML = "";
        gameGrid.style.pointerEvents = "none";
        resetGameMessage();
    }

    makeGrid = () => {
        for (let y = 0; y < this.y; y++) {
            const row = document.createElement("div");
            row.id = `row${y}`;
            row.className = "row";
            for (let x = 0; x < this.x; x++) {
                const col = document.createElement("div");
                col.onclick = () => this.tileClick(col, y, x);
                col.id = `${y}-${x}`;
                col.className = "col invisible";
                row.appendChild(col);
            }
            gameGrid.appendChild(row);
        }
    }

    fillGridAnswers = () => {
        let gridArray = [];
        for (let y = 0; y < this.y; y++) {
            let rowArray = [];
            for (let x = 0; x < this.x; x++) {
                rowArray.push(0);
            }
            gridArray.push(rowArray);
        }

        let answers = this.pickRandomTiles(this.y * this.x, this.numbAnswers);
        answers.forEach((tile) => {
            let x = tile % this.x;
            let y = Math.floor(tile / this.x);
            gridArray[y][x] = 1;
            let colId = `${y}-${x}`;
            let col = document.getElementById(colId);
            this.answers.push(col);
        })

        this.grid = gridArray;
        console.log(this.grid);
    }

    pickRandomTiles = (numbTiles, numbAnswers) => {
        let array = [];
        for (let i = 0; i < numbTiles; i++) {
            array.push(i);
        }

        // Shuffle array
        const shuffled = array.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        let answerArray = shuffled.slice(0, numbAnswers);

        return answerArray;
    }

    renderTiles = () => {
        // Show answers
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                let colId = `${y}-${x}`;
                let col = document.getElementById(colId);
                col.className = "col";
            }
        }
    }

    previewAnswers = () => {

        // Show answers
        this.showAnswers();


        // Hide answers
        setTimeout(() => { this.hideAnswers(); }, 1500);


        // Rotate board 
        setTimeout(function () {
            gameBoard.className = "gameBoard rotate";
            // console.log('rotating board');
        }, 2000);
    }


    showAnswers = () => {
        for (const answer of this.answers) {
            answer.className = "col correct"
        }
    }

    hideAnswers = () => {
        for (const answer of this.answers) {
            answer.className = "col"
        }
    }


    tileClick = (col, y, x) => {
        this.totalClick++;

        if (this.grid[y][x] === 1) {
            this.answers = this.answers.filter((obj) => { return obj.id !== `${y}-${x}`; });
            this.totalScore++;
            col.className = "col correct";

        } else {
            this.mistake = true;
            this.totalScore--;
            col.className = "col wrong";
        }

        if (this.totalScore < 0) {
            gameDashboard.classList.add('board-active');
            gameOverGameMessage();
            setTimeout(() => { loadSummary(game.totalScore, game.maxLevel); }, 2000);
            return;
        } else {
            attemptsGameMessage(this);
        }

        if (this.totalClick == this.numbAnswers) {
            if (this.mistake) {
                this.level.currLevel <= 0 ? this.level.currLevel = 0 : this.level.currLevel--;
            } else {
                this.totalScore += this.numbAnswers;
                this.level.currLevel === this.level.maxLevel ? currLevel = this.level.maxLevel : this.level.currLevel++;
            }
            if (this.answers.length != 0) { setTimeout(() => { this.showAnswers(); }, 1000); }
            setTimeout(() => { this.beginGameRound(); }, 3000);
        }
        this.level.currMax > this.level.currLevel ? this.level.currMax : this.level.currMax = this.level.currLevel + 1;
        showScore(this);
    }


    beginGameRound = () => {
        let currLevel = this.level.currLevel;
        if (this.currRound <= this.totalRounds) {
            this.x = this.level.data[currLevel].x;
            this.y = this.level.data[currLevel].y;
            this.numbAnswers = this.level.data[currLevel].answers;
            this.clearGrid();
            this.makeGrid();
            this.fillGridAnswers();
            setTimeout(() => this.renderTiles(), 1000);
            setTimeout(() => this.previewAnswers(), 2000);
            setTimeout(() => gameGrid.style.pointerEvents = "auto", 5000);
            document.getElementsByClassName('gameBoard')[0].className = "gameBoard";
            showScore(this);
            showTiles(this);
            showTrials(this);
            this.currRound > this.totalRounds ? this.currRound = this.totalRounds : this.currRound++;

        } else {
            setTimeout(() => { loadSummary(game.totalScore, game.maxLevel); }, 1000);
        }
    }
}

// Click Events
$('#startBtn').click(function () {
    welcome.classList.add('hide');
    gameDashboard.classList.remove('board-active');
    makeScoreBoard();
    game = new Game();
    setTimeout(() => { game.beginGameRound(); }, 1000);
});


$('.restartBtn').click(function () {
    gameDashboard.classList.remove('board-active');
    game.reset();
});

$('#quitBtn').click(function () {
    gameDashboard.classList.add('board-active');
    loadConfirmModal(confirmQuit, confirmQuitHeader, confirmQuitMsg, function () { return loadSummary(game.totalScore, game.level.currMax); }, hideConfirm);
});


$('#submitBtn').click(function () {
    gameDashboard.classList.add('board-active');
    loadConfirmModal(confirmSubmit, confirmSubmitHeader, confirmSubmitMsg, loadLeaderboard, function () { return loadSummary(game.totalScore, game.level.currMax); });
});
