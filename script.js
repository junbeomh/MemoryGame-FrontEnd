class Game {
    constructor() {
        this.grid = [];
        this.totalScore = 0;
        this.roundScore = 0;
        this.level = new Level(level);
        this.currLevel = 0;
        this.x = 3;
        this.y = 3;
        this.numbAnswers = 3;
        this.isError = true;
    }

    makeGrid = () => {
        const gameGrid = document.getElementById("gameGrid");
        for (let y = 0; y < this.y; y++) {
            const row = document.createElement("div");
            row.id = `row${y}`;
            row.className = "row";
            for (let x = 0; x < this.x; x++) {
                const col = document.createElement("div");
                col.onclick = () => this.tileClick(col, y, x);
                col.id = `${y}-${x}`;
                col.className = "col";
                row.appendChild(col);
            }
            gameGrid.appendChild(row);
        }
        console.log(`made ${this.x}x${this.y} grid`);
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
            console.log(`tile: ${tile}`);
            let x = tile % this.x;
            let y = Math.floor(tile / this.x);
            // console.log(`x: ${x}`);
            // console.log(`y: ${y}`);
            gridArray[y][x] = 1;
        })
        console.log(gridArray);
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

    previewAnswers = () => {
        const gameBoard = document.getElementsByClassName('gameBoard');
        let answers = [];

        // Show answers
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                let colId = `${y}-${x}`;
                let col = document.getElementById(colId);
                if (this.grid[y][x] === 1) {
                    col.className = "col correct";
                    answers.push(col);
                }
            }
        }
        console.log('showing answers');

        // Hide answers
        setTimeout(function () {
            for (const col of answers) {
                col.className = "col"
            }
            console.log('hiding answers');
        }, 2000);


        // Rotate board 
        setTimeout(function () {
            gameBoard.className = "rotate";
            console.log('rotating board');
        }, 3000);
    }


    tileClick = (col, y, x) => {
        //compare grid[y][x] to col[y][x]
        if (this.grid[y][x] === 1) {
            this.totalScore++;
            col.className = "col correct";
            console.log('picked correct answer');
        } else {
            this.totalScore--;
            col.className = "col wrong";
            console.log('picked wrong answer');
        }
        document.getElementById("scoreValue").innerHTML = this.totalScore;
    }

    beginGameRound = () => {
        this.makeGrid();
        this.fillGridAnswers();
        this.previewAnswers();
        console.log(this.level);
        console.log(this.x);
        console.log(this.y);
        console.log(this.numbAnswers);
        this.currLevel++;
        this.x = this.level[this.currLevel].x;
        this.y = this.level[this.currLevel].y;
        this.numbAnswers = this.level[this.currLevel].answers;
        console.log(this.x);
        console.log(this.y);
        console.log(this.numbAnswers);

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
];
