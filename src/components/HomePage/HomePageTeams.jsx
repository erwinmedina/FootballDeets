import { connection } from 'mongoose';
import { useEffect, useState } from 'react';
import * as footballService from "../../utilities/football-service"
import "./HomePageTeams.css";

export default function HomePageMatches({filter, setFilter}) {
    const [matches, setMatches] = useState([]);
    const [teamArray, setTeamArray] = useState();
    const [team, setTeam] = useState();
  
    function handleMatchButton() {
      setFilter('match');
    }
    function handleTeamButton() {
      setFilter('team');
    }

    function removeFC(string) {
        return string = string.substring(0, string.length-3);
    }
    function timeConvert(string) {
        let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let d = new Date(string);
        let dateInfo = daysOfWeek[d.getUTCDay()] + ' ' +  monthsOfYear[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
        
        let ms = d.getTime();
        let hours = Math.floor((ms / 1000 / 3600) % 24);
        let minutes = Math.floor((ms / 1000 / 60) % 60);
        if (minutes === 0) {
            minutes = minutes.toString();
            minutes = '00';
        }
        
        hours = hours.toString();
        let gameTime;
        if (hours < 19) {
            gameTime = hours-7+":"+minutes + 'am';
        } else {
            gameTime = hours-7+":"+minutes + 'pm';
        }

        let dateAndTime = dateInfo + ' - ' + gameTime + ' PST';
        return dateAndTime;
    }


    function handleChange(event) {
        setTeam(event.target.value);
    }

    useEffect(function() {
        async function getAllMatches() {
            const match = await footballService.getMatches();
            const filtered = match.matches.filter(item => (
                item.homeTeam.name === team || item.awayTeam.name === team
            ))
            setMatches(filtered);
        }
        getAllMatches();
    },[team])

    useEffect(function() {
        async function getTeams() {
            const allTeams = await footballService.getTeams();
            allTeams.teams.sort((a,b) => a.shortName > b.shortName ? 1:-1);
            setTeamArray(allTeams.teams);   
            setTeam(allTeams.teams[0].name);
            console.log(allTeams.teams);
        }
        getTeams()
    }, [])

    return (
        <div className="homePageTeams">
            <div className="homePageTeamsContainer container">
            <div className="leftHandHPContainer">
                <div className="form-group">
                    <select className="custom-select" onChange={handleChange} name="matchday" id="matchday">
                        {teamArray && teamArray.map(team => (
                            <option value={team.name}>{team.shortName}</option>
                        ))}
                    </select>
                </div>
                <div onClick={handleMatchButton} className={`${filter === 'match' ? 'btn-success' : 'btn-primary'} btn`}>Matchday</div>
                <div onClick={handleTeamButton} className={`${filter === 'team' ? 'btn-success' : 'btn-primary'} btn`}>Team</div>
            </div>

                

                {matches && matches.map(match => (
                    <div className="matchBox container">
                        <div className="matchBoxTop">
                            <p>Matchday {match.matchday}</p>
                            <p>{timeConvert(match.utcDate)}</p>
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
                                <p>{match.score.fullTime.homeTeam}</p>
                                <p>vs</p>
                                <p>{match.score.fullTime.awayTeam}</p>
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