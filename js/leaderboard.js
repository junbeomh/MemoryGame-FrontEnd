function Leaderboard() {
    this.getLeaders = () => {
        var apigClient = apigClientFactory.newClient({
            accessKey: AWS_ACCESS_KEY,
            secretKey: AWS_SECRET_ACCESS_KEY,
            region: AWS_REGION,
        });
        var params = {
            //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        };
        var body = {
            //This is where you define the body of the request
        };
        var additionalParams = {
            //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
            headers: {
            },
            queryParams: {
            }
        };

        apigClient.scoreboardGet(params, body, additionalParams)
        .then(function (result) {
            console.log(result.data.body.Items);
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
            result.data.body.Items.forEach((data, index) => {
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
        }).catch(function (result) {
            console.log("error");
        });
    }
}

let leaderboard = new Leaderboard();
leaderboard.getLeaders();
