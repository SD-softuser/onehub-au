import { useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/api/testing');
      const data = res.data;
      console.log(data);
    }

    fetch();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}

export default App;
