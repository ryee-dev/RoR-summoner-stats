import React from 'react';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Link to="/summoners-rift">Summoner's Rift</Link>
      <Link to="/teamfight-tactics">Teamfight Tactics</Link>
    </div>
  );
};

export default App;
