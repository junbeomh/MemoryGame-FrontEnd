class Game {
    constructor() {
        this.grid = [];
        this.answers = [];
        this.totalScore = 0;
        this.roundScore = 0;
        this.currRound = 0;
        this.totalRounds = 11;
        this.level = new Level(level);
        this.currLevelIndex = 0;
        this.x = 3;
        this.y = 3;
        this.totalClick = 0;
        this.numbAnswers = 3;
        this.levelClear = false;
        this.mistake = false;
        this.isStarted = false;
    }

    clearGrid = () => {
        const gameGrid = document.getElementById("gameGrid");
        const gameMessage = document.getElementById("gameMessage");
        this.answers = [];
        this.roundScore = 0;
        this.totalClick = 0;
        gameGrid.innerHTML = "";
        gameMessage.style.visibility = "hidden";
    }

    makeGrid = () => {
        const gameGrid = document.getElementById("gameGrid");
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
        const gameBoard = document.getElementsByClassName('gameBoard')[0];

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
        const gameGrid = document.getElementById("gameGrid");
        const gameMessage = document.getElementById("gameMessage");
        const gameScore = document.getElementById("scoreValue");
        let colId = `${y}-${x}`;
        this.totalClick++;

        //compare grid[y][x] to col[y][x]
        if (this.grid[y][x] === 1) {
            let index = this.answers.indexOf(colId);

            this.answers.splice(index, 1);
            this.roundScore++;
            this.totalScore++;
            col.className = "col correct";

        } else {
            this.mistake = true;
            this.levelClear = false;
            this.totalScore--;
            col.className = "col wrong";
        }

        // decide when round ends 
        if (this.totalClick == this.numbAnswers) {
            if (this.mistake) {
                this.levelClear = false;
            } else {
                this.levelClear = true;
                // setTimeout(() => {
                this.totalScore += this.numbAnswers;

                // }, 1000);
            }
            gameGrid.style.pointerEvents = "none";
            if (this.answers.length != 0) {
                setTimeout(() => { this.showAnswers(); }, 800);
            }
            setTimeout(() => { this.beginGameRound(); }, 3000);
        }

        gameMessage.innerHTML = `Keep Clicking. You can uncover ${this.numbAnswers - this.totalClick} more tiles.`;
        gameMessage.style.visibility = "visible";
        gameScore.innerHTML = this.totalScore;
    }


    beginGameRound = () => {
        const tiles = document.getElementById('tileNumValue');
        const gameGrid = document.getElementById("gameGrid");
        const trials = document.getElementById('trialNumValue');
        const maxLevelIndex = Object.keys(this.level).length - 1;
        trials.innerHTML = `${this.currRound + 1} &nbsp; of &nbsp;  ${this.totalRounds + 1} `;


        if (this.currRound === this.totalRounds) {
            console.log("MAX LEVEL")
            // highscore board 
        } else {
            if (!this.levelClear) {
                if (this.currLevelIndex > 0 && this.isStarted) {
                    this.currLevelIndex--;
                }
            } else {
                this.currLevelIndex == maxLevelIndex ? this.currLevelIndex = maxLevelIndex : this.currLevelIndex++;
            }


            this.isStarted = true;
            this.mistake = false;
            this.x = this.level[this.currLevelIndex].x;
            this.y = this.level[this.currLevelIndex].y;
            this.numbAnswers = this.level[this.currLevelIndex].answers;
            tiles.innerHTML = this.numbAnswers;
            this.clearGrid();
            this.makeGrid();
            this.fillGridAnswers();
            setTimeout(() => this.renderTiles(), 1000);
            setTimeout(() => this.previewAnswers(), 2000);
            setTimeout(() => gameGrid.style.pointerEvents = "auto", 5000);
            document.getElementsByClassName('gameBoard')[0].className = "gameBoard";
            this.currRound++;
        }
    }
}

const level = [
    {
        x: 3,
        y: 3,
        answers: 3,
    },
    {
        x: 4,
        y: 3,
        answers: 4,
    },
    {
        'x': 4,
        'y': 4,
        answers: 5,
    },
    {
        'x': 5,
        'y': 4,
        answers: 6,
    },
    {
        'x': 5,
        'y': 5,
        answers: 7,
    },
    {
        'x': 6,
        'y': 5,
        answers: 8,
    },
    {
        'x': 6,
        'y': 6,
        answers: 9,
    },
    {
        'x': 7,
        'y': 6,
        answers: 10,
    },
    {
        'x': 7,
        'y': 7,
        answers: 11,
    },
];
