import HomePageMatches from "../../components/HomePage/HomePageMatches";
import HomePageStandings from "../../components/HomePage/HomePageStandings";
import "./HomePage.css";

export default function HomePage() {
  
  return (
    <div className="homepage">
      <div className="leftHandHP">
        <HomePageMatches/>
      </div>
      <div className="rightHandHP">
        <HomePageStandings/>
      </div>
    </div>
  );
}