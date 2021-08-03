import { useEffect, useState } from 'react';
import * as footballService from "../../utilities/football-service"
import "./HomePageStandings.css";

export default function HomePageStandings() {
  const [standings, setStandings] = useState([]);
  
  useEffect(function() {
    async function getStanding() {
      const standing = await footballService.getAll();
      setStandings(standing.standings[0].table);
    }
    getStanding();
    },[])

    function removeFC(string) {
      return string = string.substring(0, string.length-3);
    }
  
    return (
        <div className="homePageStandings">
        <h1>Standings</h1>
            <table>
                <tr>
                    <th></th>
                    <th className="teamName">Club</th>
                    <th></th>
                    <th>MP</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                </tr>
                {standings.map(team => 
                <tr>
                    <td>{team.position}</td>
                    <td><img src={team.team.crestUrl}/></td>
                    <td className="teamName">{removeFC(team.team.name)}</td>
                    <td>{team.playedGames}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td>{team.goalDifference}</td>
                    <td>{team.won}</td>
                    <td>{team.lost}</td>
                    <td>{team.draw}</td>
                    <td>{team.points}</td>
                </tr>
                )}
            </table>
        
        </div>
  );
}