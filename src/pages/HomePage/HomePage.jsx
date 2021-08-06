import { useEffect, useState } from 'react';

import HomePageMatches from "../../components/HomePage/HomePageMatches";
import HomePageTeams from "../../components/HomePage/HomePageTeams";
import HomePageStandings from "../../components/HomePage/HomePageStandings";

import "./HomePage.css";

export default function HomePage() {
  const [filter, setFilter] = useState('match');


  return (
    <div className="homepage">
      <div className="leftHandHP">
        {filter === 'match' ? 
          <HomePageMatches filter={filter} setFilter={setFilter}/>
          :
          <HomePageTeams filter={filter} setFilter={setFilter}/>
        }
      </div>
      <div className="rightHandHP">
        <HomePageStandings/>
      </div>
    </div>
  );
}