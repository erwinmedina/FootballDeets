import "./HomePageStandings.css";

export default function HomePageStandings({standings}) {
    return (
        <div className="homePageStandings">
          <div className="homePageStandingsContainer">
            <h2>{Object.keys(standings).length && standings.competition.name} Standings</h2>
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
                {Object.keys(standings).length && standings.standings[0].table.map(team => 
                <tr>
                    {console.log(team)}
                    <td>{team.position}</td>
                    <td className="teamImg"><img src={team.team.crestUrl}/></td>
                    <td className="teamName">{team.team.name}</td>
                    <td className="teamNumbers">{team.playedGames}</td>
                    <td className="teamNumbers">{team.won}</td>
                    <td className="teamNumbers">{team.lost}</td>
                    <td className="teamNumbers">{team.draw}</td>
                    <td className="teamNumbers">{team.goalsFor}</td>
                    <td className="teamNumbers">{team.goalsAgainst}</td>
                    <td className="teamNumbers">{team.goalDifference}</td>
                    <td className="teamNumbers">{team.points}</td>
                </tr>
                )}
            </table>
            </div> 
        </div>
  );
}