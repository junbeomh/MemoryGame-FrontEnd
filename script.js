// DOM constants 
const gameGrid = document.getElementById("gameGrid");
const gameMessage = document.getElementById("gameMessage");
const scoreBoard = document.getElementById("scoreBoard");
const confirmQuit = document.querySelector('.confirmQuit');
const confirmSubmit = document.querySelector('.confirmSubmit');
const welcome = document.querySelector('.welcome');
const summary = document.querySelector('.summary');
const leaderboard = document.querySelector('.leaderboard');
const gameDashboard = document.querySelector('.gameDashboard');
const gameBoard = document.getElementsByClassName('gameBoard')[0];

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
        this.observers = [];
    }

    reset = () => {
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
        setTimeout(() => { this.beginGameRound(); }, 1000);
    }

    clearGrid = () => {
        this.answers = [];
        this.totalClick = 0;
        this.isStarted = true;
        this.mistake = false;
        gameGrid.innerHTML = "";
        gameMessage.style.visibility = "hidden";
    }

    makeGrid = () => {
        gameGrid.className = "gameGrid disableClick"
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
        const gameScore = document.getElementById("scoreNumValue");
        this.totalClick++;

        //compare grid[y][x] to col[y][x]
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
            setTimeout(() => { load('./summary.html', true); }, 2000);
        }


        if (this.totalClick == this.numbAnswers) {
            if (this.mistake) {
                this.level.currLevel <= 0 ? this.level.currLevel = 0 : this.level.currLevel--;
            } else {
                this.totalScore += this.numbAnswers;
                this.level.currLevel === this.level.maxLevel ? currLevel = this.level.maxLevel : this.level.currLevel++;
            }
            gameGrid.style.pointerEvents = "none";
            if (this.answers.length != 0) { setTimeout(() => { this.showAnswers(); }, 1000); }
            setTimeout(() => { this.beginGameRound(); }, 1500);
        }
        gameMessage.innerHTML = `Keep Clicking. You can uncover ${this.numbAnswers - this.totalClick} more tiles.`;
        gameMessage.style.visibility = "visible";
        gameScore.innerHTML = this.totalScore;
    }


    beginGameRound = () => {
        const tiles = document.getElementById('tileNumValue');
        const trials = document.getElementById('trialNumValue');
        const gameScore = document.getElementById("scoreNumValue");

        let currLevel = this.level.currLevel;
        if (this.currRound < this.totalRounds) {
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

            tiles.innerHTML = this.numbAnswers;
            trials.innerHTML = `${this.currRound + 1} &nbsp; of &nbsp;  ${this.totalRounds + 1} `;
            gameScore.innerHTML = this.totalScore < 0 ? this.totalScore = 0 : this.totalScore;

            this.currRound > this.totalRounds ? this.currRound = this.totalRounds : this.currRound++;

        } else {
            setTimeout(() => { load('./summary.html', true); }, 1000);
        }
    }
}


function renderScoreBoard(){
    const boardTypes = ["tile", "trial", "score"];
    let scoreboard = document.getElementById("scoreBoard");
    for (let board of boardTypes) {
        const boardDiv = document.createElement("div");
        boardDiv.setAttribute("class", `${board}Num`);
        const label = document.createElement("p");
        label.setAttribute("id", `${board}NumLabel`);
        label.innerHTML = `${board}`;
        const value = document.createElement("p");
        value.setAttribute("id", `${board}NumValue`);
        boardDiv.appendChild(label);
        boardDiv.appendChild(value);
        scoreboard.appendChild(boardDiv);
    }
}



function load(page, withData) {
    gameDashboard.classList.add('board-active');
    var dialog = $.dialog({
        type: 'blue',
        closeIcon: false,
        title: false,
        content: `url:${page}`,
        onContentReady: function () {
            if (withData) {
                switch (page) {
                    case "./summary.html":
                        this.$content.find('#gameScoreValue').text(game.totalScore);
                        this.$content.find('#levelValue').text(game.totalScore);

                    case "./leaderboard.html":
                    // database action here
                }
            }
            this.$content.find('.restartBtn').click(function () {
                gameDashboard.classList.remove('board-active');
                dialog.close();
            });
            this.$content.find('#submitBtn').click(function () {
                dialog.close();
            });
        },
    });
}

function loadIntro() {
    $('.gameDashboard').load("./welcome.html");
}

// Game Events

$('#startBtn').click(function () {
    welcome.classList.add('hide');
    gameDashboard.classList.remove('board-active');
    renderScoreBoard();
    game = new Game();
    setTimeout(() => { game.beginGameRound(); }, 1000);
});


$('.restartBtn').click(function () {
    console.log('pressed');
    game.reset();
});

$('#quitBtn').click(function () {
    welcome.classList.add('hide');
    gameDashboard.classList.add('board-active');
});

$('#submitBtn').click(function () {
    welcome.classList.add('hide');
    gameDashboard.classList.add('board-active');
});

$('#quitBtn').confirm({
    type: 'red',
    title: 'Quit game?',
    content: 'All progress made will be lost.',
    backgroundDismiss: false,
    buttons: {
        quit: {
            text: 'quit game',
            btnClass: 'dialog-button',
            action: function () {
                $("#gameDashboard").empty();
                load('./summary.html', true)
            }
        },
        cancel: {
            text: 'cancel',
            btnClass: 'dialog-button',
            action: function () {
                gameDashboard.classList.remove('board-active')
            }
        },
    }
});


$('#submitBtn').confirm({
    type: 'red',
    title: 'Submit?',
    content: 'Submit game score to database.',
    backgroundDismiss: false,
    buttons: {
        quit: {
            text: 'submit',
            btnClass: 'dialog-button',
            action: function () {
                gameDashboard.classList.add('board-active');
                $("#gameDashboard").empty();
                load('./leaderboard.html', false);
            }
        },
        cancel: {
            text: 'cancel',
            btnClass: 'dialog-button',
            action: function () {
                $("#gameDashboard").empty();
                load('./summary.html');
            }
        },
    }
});

