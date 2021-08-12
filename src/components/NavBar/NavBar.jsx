import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, setId}) {
  
  function handleLogOut() {
    userService.logOut();
    setUser(null);
    
  }


  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">F.D.</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" onClick={() => setId(2021)} href="#">Premier League<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => setId(2016)} href="#">Championship<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => setId(2014)} href="#">La Liga</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => setId(2002)} href="#">Bundesliga</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}