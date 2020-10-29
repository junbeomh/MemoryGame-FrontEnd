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
            payload.forEach((data, index) => {
                let leaderboard = document.getElementById('leaderboardEntries');
                let entry = document.createElement('div');
                let rank = document.createElement('p');
                let name = document.createElement('p');
                let score = document.createElement('p')
                rank.innerHTML = `${index + 1}.`;
                name.innerHTML = data['name'];
                score.innerHTML = data['score'];
                entry.setAttribute('class', 'leaderboardEntry');
                name.setAttribute('id', 'nameLeaderBoard');
                score.setAttribute('id', 'scoreLeaderBoard');
                entry.appendChild(rank);
                entry.appendChild(name);
                entry.appendChild(score);
                leaderboard.appendChild(entry);
            })
        });
    }
}

let leaderboard = new Leaderboard();
leaderboard.getLeaders();
