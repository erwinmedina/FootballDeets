const BASE_URL = "https://api.football-data.org/v2/competitions/2021/standings";

export function getAll(){
    return fetch(BASE_URL, {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
        .then((res) => {return res.json()})
        .catch(error => console.log('Error while fetching:', error))

}