function Leaderboard() {
    this.getLeaders = () => {
        fetch(LOCAL_HOST + LEADERBOARD_ENDPOINT, {
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
                // let entry = document.createElement('div');
                // let rank = document.createElement('p');
                // let name = document.createElement('p');
                // let score = document.createElement('p')
                // rank.innerHTML = `${index + 1}.`;
                // name.innerHTML = data['name'];
                // score.innerHTML = data['score'];
                // entry.setAttribute('class', 'leaderboardEntry');
                // name.setAttribute('id', 'nameLeaderBoard');
                // score.setAttribute('id', 'scoreLeaderBoard');
                // entry.appendChild(rank);
                // entry.appendChild(name);
                // entry.appendChild(score);
                // leaderboard.appendChild(entry);
            })
            leaderboard.appendChild(table);

        });
    }
}

let leaderboard = new Leaderboard();
leaderboard.getLeaders();
