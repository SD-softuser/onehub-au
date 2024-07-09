import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FieldGuide from "./pages/FieldGuide";
import LeaderBoard from "./pages/Leaderboard";
import { Toaster } from "react-hot-toast";

function App() {
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get('/api/testing');
  //     const data = res.data;
  //     console.log(data);
  //   }

  //   fetch();
  // }, []);

  return (
    <div>
      <nav className="fixed text-center bg-yellow-500/80 w-full backdrop-blur-xl z-[10000] py-1">
        This is for testing only
      </nav>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/field-guide" element={<FieldGuide />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
}

export default App;
