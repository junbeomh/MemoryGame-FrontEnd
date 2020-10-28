const makeScoreBoard = () => {
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


const resetGameMessage = () => {
    gameMessage.innerHTML = ``;
    gameMessage.style.visibility = "hidden";
}

const attemptsGameMessage = (game) => {
    gameMessage.innerHTML = `Keep Clicking. You can uncover ${game.numbAnswers - game.totalClick} more tiles.`
    gameMessage.style.visibility = "visible";
}

const gameOverGameMessage = () => {
    gameMessage.innerHTML = `Game Over`
    gameMessage.style.visibility = "visible";
}

const showScore = (game) => {
    document.getElementById("scoreNumValue").innerHTML = game.totalScore < 0 ? game.totalScore = 0 : game.totalScore;
}

const showTiles = (game) => {
    document.getElementById('tileNumValue').innerHTML = game.numbAnswers;
}

const showTrials = (game) => {
    document.getElementById('trialNumValue').innerHTML = `${game.currRound + 1} &nbsp; of &nbsp;  ${game.totalRounds + 1} `;
}


const hideConfirm = () => {
    gameDashboard.classList.remove('board-active');
}

const loadConfirmModal = (type, header, msg, submitCallback, cancelCallback) => {
    $('.gameDashboard').load("./modalConfirm.html", () => {
        document.getElementById("confirmHeader").innerHTML = header;
        document.getElementById("confirmMsg").innerHTML = msg;
        document.getElementById("btnConfirm").innerHTML = type;
        document.getElementById("btnCancel").innerHTML = btnCancel;
        document.getElementById("btnConfirm").onclick = submitCallback;
        document.getElementById("btnCancel").onclick = cancelCallback;
    });
}

const loadLeaderboard = () => {
    $('.gameDashboard').load("./leaderboard.html", () => {
        document.getElementById("leaderboardTitle").innerHTML = leaderboardHeader;
        console.log(document.getElementById("restartBtn"));
        document.getElementById("restartBtn").innerHTML = btnRestart;
    });
}

const loadSummary = () => {
    $('.gameDashboard').load("./summary.html", () => {
        document.getElementById("summaryTitle").innerHTML = summaryHeader;
        document.getElementById("gameScoreLabel").innerHTML = summaryGameScore;
        document.getElementById("levelLabel").innerHTML = summaryGameMaxLvl;
        document.getElementById("name").innerHTML = summaryFormName;
        document.getElementById("submitBtn").innerHTML = btnSubmit;
        document.getElementById("restartBtn").innerHTML = btnRestart;
    });
}

const loadIntro = () => {
    $('.gameDashboard').load("./welcome.html", () => {
        document.getElementById("welcomeTitle").innerHTML = introHeader;
        document.getElementById("introHeader").innerHTML = introBody;
        document.getElementById("startBtn").innerHTML = btnStart;
    });
}


$('#quitBtn').click(function () {
    gameDashboard.classList.add('board-active');
    loadConfirmModal(confirmQuit, confirmQuitHeader, confirmQuitMsg, loadSummary, hideConfirm);
});


$('#submitBtn').click(function () {
    gameDashboard.classList.add('board-active');
    loadConfirmModal(confirmSubmit, confirmSubmitHeader, confirmSubmitMsg, loadLeaderboard, loadSummary);
});
