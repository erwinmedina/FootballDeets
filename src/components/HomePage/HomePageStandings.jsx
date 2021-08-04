import { useEffect, useState } from 'react';
import * as footballService from "../../utilities/football-service"
import "./HomePageStandings.css";

export default function HomePageStandings() {
  const [standings, setStandings] = useState([]);
  
  useEffect(function() {
    async function getStanding() {
      const standing = await footballService.getStandings();
      setStandings(standing.standings[0].table);
    }
    getStanding();
    },[])

    function removeFC(string) {
      return string = string.substring(0, string.length-3);
    }
  
    return (
        <div className="homePageStandings">
          <div className="homePageStandingsContainer">
            <h2>Premier League Standings</h2>
            <table className="table table-sm">
                <tr>
                    <th scope="col"></th>
                    <th scope="col" className="teamName">Club</th>
                    <th scope="col"></th>
                    <th scope="col">MP</th>
                    <th scope="col">W</th>
                    <th scope="col">D</th>
                    <th scope="col">L</th>
                    <th scope="col">GF</th>
                    <th scope="col">GA</th>
                    <th scope="col">GD</th>
                    <th scope="col">Points</th>
                </tr>
                {standings.map(team => 
                <tr>
                    <td>{team.position}</td>
                    <td className="teamImg"><img src={team.team.crestUrl}/></td>
                    <td className="teamName">{removeFC(team.team.name)}</td>
                    <td className="teamNumbers">{team.playedGames}</td>
                    <td className="teamNumbers">{team.goalsFor}</td>
                    <td className="teamNumbers">{team.goalsAgainst}</td>
                    <td className="teamNumbers">{team.goalDifference}</td>
                    <td className="teamNumbers">{team.won}</td>
                    <td className="teamNumbers">{team.lost}</td>
                    <td className="teamNumbers">{team.draw}</td>
                    <td className="teamNumbers">{team.points}</td>
                </tr>
                )}
            </table>
            </div> 
        </div>
  );
}