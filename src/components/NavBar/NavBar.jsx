import { useState } from 'react';
import "./NavBar.css";

export default function NavBar({ user, setUser, setId}) {
  const [hover, setHover] = useState(false);
  
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a 
        class="navbar-brand" 
        href="#"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >{hover ? "F.D." : "FootballDeets"}
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link btn" onClick={() => setId(2021)} href="#">Premier League<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn" onClick={() => setId(2016)} href="#">Championship<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn" onClick={() => setId(2014)} href="#">La Liga</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn" onClick={() => setId(2002)} href="#">Bundesliga</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn" onClick={() => setId(2019)} href="#">Serie A</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn" onClick={() => setId(2015)} href="#">Ligue 1</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}