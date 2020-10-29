function Leaderboard() {
    this.getLeaders = () => {
        fetch(API + LEADERBOARD_ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            },
        }).then((response) => {
            return response.json();
        }).then((payload) => {
            let leaderboard = document.getElementById('leaderboardEntries');
            let table = document.createElement("table");
            let tableHead = document.createElement("thead");
            let tableBody = document.createElement("tbody");
            let tableRow = document.createElement("tr");
            let rankHeader = document.createElement('th');
            let nameHeader = document.createElement('th');
            let scoreHeader = document.createElement('th');
            rankHeader.innerHTML = leaderboardRankHeader;
            nameHeader.innerHTML = leaderboardNameHeader;
            scoreHeader.innerHTML = leaderboardScoreHeader;
            tableRow.appendChild(rankHeader);
            tableRow.appendChild(nameHeader);
            tableRow.appendChild(scoreHeader);
            tableHead.appendChild(tableRow);
            table.setAttribute('class', 'table');
            table.appendChild(tableHead);
            table.appendChild(tableBody);

            payload.forEach((data, index) => {
                let row = document.createElement("tr");
                let rank = document.createElement('td');
                let name = document.createElement('td');
                let score = document.createElement('td');
                rank.innerHTML = `${index + 1}.`;
                name.innerHTML = data['name'];
                score.innerHTML = data['score'];
                row.appendChild(rank);
                row.appendChild(name);
                row.appendChild(score);
                tableBody.appendChild(row);
            })
            leaderboard.appendChild(table);

        });
    }
}

let leaderboard = new Leaderboard();
leaderboard.getLeaders();
