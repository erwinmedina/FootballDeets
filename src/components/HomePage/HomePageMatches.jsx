import "./HomePageMatches.css";

export default function HomePageMatches({filter, setFilter, matches, teamArray, matchArray, setMatchday}) {
  
    function handleMatchButton() {
      setFilter('match');
    }
    function handleTeamButton() {
      setFilter('team');
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
        setMatchday(parseInt(event.target.value));
    }

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
                    <div onClick={handleMatchButton} className={`${filter === 'match' ? 'btn-success' : 'btn-primary'} btn btn-primary`}>Matchday</div>
                    <div onClick={handleTeamButton} className={`${filter === 'team' ? 'btn-success' : 'btn-primary'} btn btn-primary`}>Team</div>
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
                                <p className="HPteamName">{match.homeTeam.name}</p>
                                <div className="HPScore">
                                    <p>{match.score.fullTime.homeTeam}</p>
                                    <p>vs</p>
                                    <p>{match.score.fullTime.awayTeam}</p>
                                </div>
                                <p className="HPteamName">{match.awayTeam.name}</p>
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