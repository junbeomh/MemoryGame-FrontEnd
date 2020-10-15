class Game {
    constructor() {
        this.score = 0;
        this.x = 4;
        this.y = 3;
        this.numbAnswers = 4;
        this.grid = [];
    }

    makeGrid = () => {
        const gameGrid = document.getElementById("gameGrid");
        for (let y = 0; y < this.y; y++) {
            const row = document.createElement("div");
            row.id = `row${y}`;
            row.className = "row";
            for (let x = 0; x < this.x; x++) {
                const col = document.createElement("div");
                col.onclick = () => this.handleClick(col, y, x);
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
        const gameGrid = document.getElementById('gameGrid');
        gameGrid.className = "game game-rotated";
    }


    handleClick = (col, y, x) => {
        console.log(col.id);

        //compare grid[y][x] to col[y][x]
        if (this.grid[y][x] === 1) {
            col.className = "col correct";
            console.log('picked correct answer');
        } else {
            col.className = "col wrong";
            console.log('picked wrong answer');
        }
    }

    startGame = () => {
        this.makeGrid();
        this.fillGridAnswers();
        this.previewAnswers();
    }
}
