import { useState, useEffect } from 'react';
import api from '../services/api';
import VentureCard from '../components/VentreCard';

export default function Ventures() {
  const [ventures, setVentures] = useState([]);

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const res = await api.get('/ventures');
        setVentures(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVentures();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Ventures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ventures.map(venture => (
          <VentureCard key={venture.id} venture={venture} />
        ))}
      </div>
    </div>
  );
}