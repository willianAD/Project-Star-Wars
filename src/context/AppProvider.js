import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  const handleName = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        setData(results);
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
