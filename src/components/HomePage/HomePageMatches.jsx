import { useEffect, useState } from 'react';
import * as footballService from "../../utilities/football-service"
import "./HomePageMatches.css";

export default function HomePageMatches({filter, setFilter}) {
    const [matchday, setMatchday] = useState(1);
    const [matches, setMatches] = useState([]);
    const [teamArray, setTeamArray] = useState();
  
    function handleMatchButton() {
      setFilter('match');
    }
    function handleTeamButton() {
      setFilter('team');
    }
    let matchArray = [];
    
    function matchdayCreator() {
        for (let i = 1; i < 39; i++) {
            matchArray.push(i);
        }
    }
    matchdayCreator();

    function removeFC(string) {
        return string = string.substring(0, string.length-3);
    }

    function handleChange(event) {
        setMatchday(parseInt(event.target.value));
    }

    useEffect(function() {
        async function getAllMatches() {
            const match = await footballService.getMatches();
            const filtered = match.matches.filter(item => (
                item.matchday === matchday
            ))
            setMatches(filtered);
        }
        getAllMatches();
        },[matchday])

    useEffect(function() {
        async function getTeams() {
            const allTeams = await footballService.getTeams();
            allTeams.teams.sort((a,b) => a.name > b.name ? 1:-1);
            setTeamArray(allTeams.teams);
        }
        getTeams()
    }, [])
    
        return (
            <div className="homePageMatches">
                <div className="homePageMatchesContainer container">
                <div className="leftHandHPContainer">
                    <div className="form-group">
                        <select className="custom-select" onChange={handleChange} name="matchday" id="matchday">
                            {matchArray && matchArray.map(match => (
                                <option value={match}>Matchday {match}</option>
                            ))}
                        </select>
                    </div>
                    <div onClick={handleMatchButton} className={`${filter === 'match' ? 'btn-success' : 'btn-primary'} btn btn-primary`}>Matches</div>
                    <div onClick={handleTeamButton} className={`${filter === 'team' ? 'btn-success' : 'btn-primary'} btn btn-primary`}>Team</div>
            </div>
                    

                    {matches && matches.map(match => (
                        <div className="matchBox container">
                            <div className="matchBoxTop">
                                <p>Matchday {match.matchday}</p>
                                <p>{match.utcDate}</p>
                            </div>
                            <div className="matchBoxBottom">
                                {teamArray && teamArray.map(logo => (
                                    logo.name === match.homeTeam.name ? 
                                        <img className="HPTeamsCrest" src={logo.crestUrl} alt="" />
                                        :
                                        ''
                                ))}
                                <p className="HPteamName">{removeFC(match.homeTeam.name)}</p>
                                <div className="HPScore">
                                    <p>{match.score.fullTime.homeTeam}0</p>
                                    <p>vs</p>
                                    <p>{match.score.fullTime.awayTeam}0</p>
                                </div>
                                <p className="HPteamName">{removeFC(match.awayTeam.name)}</p>
                                {teamArray && teamArray.map(logo => (
                                    logo.name === match.awayTeam.name ? 
                                        <img className="HPTeamsCrest" src={logo.crestUrl} alt="" />
                                        :
                                        ''
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>
    );
}