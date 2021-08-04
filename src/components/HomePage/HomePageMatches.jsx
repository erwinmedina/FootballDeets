import { useEffect, useState } from 'react';
import * as footballService from "../../utilities/football-service"
import "./HomePageMatches.css";

export default function HomePageMatches() {
    const [matchday, setMatchday] = useState(1);
    const [matches, setMatches] = useState([]);
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
    
        return (
            <div className="homePageMatches">
                <div className="homePageMatchesContainer container">
                    <div className="form-group">
                        <select className="custom-select" onChange={handleChange} name="matchday" id="matchday">
                            {matchArray.map(match => (
                                <option value={match}>Matchday {match}</option>
                            ))}
                        </select>
                    </div>

                    {matches.map(match => (
                        <div className="matchBox container">
                            {console.log(match)}
                            <div className="matchBoxTop">
                                <p>Matchday {match.matchday}</p>
                                <p>{match.utcDate}</p>
                            </div>
                            <div className="matchBoxBottom">
                                <p>{removeFC(match.homeTeam.name)}</p>
                                <p>{match.score.fullTime.homeTeam}</p>
                                <p>vs.</p>
                                <p>{match.score.fullTime.awayTeam}</p>
                                <p>{removeFC(match.awayTeam.name)}</p>
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>
    );
}