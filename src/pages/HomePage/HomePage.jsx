import { useEffect, useState } from 'react';

import * as footballService from "../../utilities/football-service"
import HomePageMatches from "../../components/HomePage/HomePageMatches";
import HomePageTeams from "../../components/HomePage/HomePageTeams";
import HomePageStandings from "../../components/HomePage/HomePageStandings";
import "./HomePage.css";

export default function HomePage({ id }) {
  const [filter, setFilter] = useState('match'); // determines if we're filtering by match or team //  
  const [matches, setMatches] = useState([]); // Array of actual matches, team vs team info //
  const [teamArray, setTeamArray] = useState(); // Array of objects with only team info [about 20 items]
  const [matchArray, setMatchArray] = useState([]); // # of matchdays, array from 1-30x so i can map //
  const [matchday, setMatchday] = useState(); // The Matchday when Filtered //
  const [standings, setStandings] = useState({}); // Team Standings //
  const [team, setTeam] = useState(); // Specific Team when Filtered //
  const [apiCall, setApiCall] = useState(0);

  useEffect(function() {
    async function getStanding() {
      const standing = await footballService.getStandings(id);
      setApiCall(apiCall+1);
      setStandings(standing);
      setMatchday(standing.season.currentMatchday)

    }
    getStanding();

    async function getAllMatches() {
        const match = await footballService.getMatches(id);
        setApiCall(apiCall+1);

        if (filter === 'match') {
          console.log(match);
          var filtered = match.matches.filter(item => (
              item.matchday === matchday
          ))
        } else {
          var filtered = match.matches.filter(item => (
            item.homeTeam.name === team || item.awayTeam.name === team
        ))
          setMatchday(1);
        }
        setMatches(filtered);

    }
    getAllMatches();

    async function getTeams() {
      const allTeams = await footballService.getTeams(id);
      setApiCall(apiCall+1);
      allTeams.teams.sort((a,b) => a.name > b.name ? 1:-1);
      setTeamArray(allTeams.teams);
      setTeam(allTeams.teams[0].name);
      setMatchArray([]);
      for (let i = 1; i <= (allTeams.count * 2 - 2); i++) {
          setMatchArray(matchArray => [...matchArray, i])
      }
    }
    getTeams()

  },[matchday, id, filter, team])

  return (
    <div className="homepage">
      <div className="leftHandHP">
        {filter === 'match' ? 
          <HomePageMatches 
            filter={filter} 
            setFilter={setFilter} 
            matches={matches}
            teamArray={teamArray}
            matchArray={matchArray}
            setMatchday={setMatchday}
          />
          :
          <HomePageTeams 
            filter={filter} 
            setFilter={setFilter} 
            matches={matches}
            teamArray={teamArray}
            setTeam={setTeam}
            />
        }
      </div>
      <div className="rightHandHP">
        <HomePageStandings 
          standings={standings}
        />
      </div>
    </div>
  );
}