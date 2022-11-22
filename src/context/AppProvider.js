import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filterPlanet, setFilters] = useState([]);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const filterName = () => {
    const filterDataName = data
      .filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
    setFilters(filterDataName);
  };

  useEffect(() => {
    if (name.length > 0) {
      filterName();
    } else {
      setFilters(data);
    }
    console.log(filterPlanet);
  }, [name]);

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        setData(results);
        setFilters(results);
      } catch (error) {
        throw new Error(error);
      }
    };
    requestAPI();
  }, []);

  const value = {
    data,
    name,
    handleName,
    filterPlanet,
    setFilters,
  };

  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
