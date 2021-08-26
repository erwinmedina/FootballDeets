const BASE_URL = "https://api.football-data.org/v2";

export function getStandings(id){
    return fetch(`${BASE_URL}/competitions/${id}/standings`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getMatches(id) {
    return fetch(`${BASE_URL}/competitions/${id}/matches`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getTeams(id) {
    return fetch(`${BASE_URL}/competitions/${id}/teams`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getEverything() {
    return fetch(`${BASE_URL}/competitions`, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}