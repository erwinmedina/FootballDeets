const BASE_URL = "https://api.football-data.org/v2";

export function getStandings(){
    return fetch(`${BASE_URL}/competitions/2021/standings`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
        .then((res) => {return res.json()})
        .catch(error => console.log('Error while fetching:', error))
}

export function getMatches() {
    return fetch(`${BASE_URL}/competitions/2021/matches`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
        .then((res) => {return res.json()})
        .catch(error => console.log('Error while fetching:', error))
}

export function getTeams() {
    return fetch(`${BASE_URL}/competitions/2021/teams`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
        .then((res) => {return res.json()})
        .catch(error => console.log('Error while fetching:', error))
}