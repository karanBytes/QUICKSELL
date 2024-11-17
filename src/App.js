import './App.css';
import { Header } from './Components/Header/Header';
import { useState, useEffect } from 'react';
import { loadGridData } from './utils/gridUtils';
import { Grid } from './Components/Grid/Grid';

// Custom hook for localStorage operations
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => localStorage.getItem(key) || defaultValue);

  const save = (newValue) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, save];
};

function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [gridData, setGridData] = useState({});
  const [grouping, setGrouping] = useLocalStorage("grouping", "status");
  const [ordering, setOrdering] = useLocalStorage("ordering", "priority");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tickets and users on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        processData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update gridData when tickets, grouping, or ordering change
  useEffect(() => {
    if (tickets.length) {
      setGridData(loadGridData(tickets, grouping, ordering));
    }
  }, [tickets, grouping, ordering]);

  const processData = (data) => {
    const { tickets, users } = data;
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
    setTickets(tickets);
    setUserData(userMap);
  };

  return (
    <>
      <Header
        grouping={grouping}
        ordering={ordering}
        setGrouping={(group) => setGrouping(group)}
        setOrdering={(order) => setOrdering(order)}
      />
      <div>
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && <Grid gridData={gridData} userData={userData} grouping={grouping} />}
      </div>
    </>
  );
}

export default App;
