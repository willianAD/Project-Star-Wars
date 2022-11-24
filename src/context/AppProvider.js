import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanet, setFiltersPlanet] = useState([]);
  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    quantity: 'maior que',
    number: 0,
  });

  const filterOperator = () => {
    let filterByQuantity = [];
    switch (inputs.quantity) {
    case 'maior que':
      filterByQuantity = filterPlanet.filter((e) => +e[inputs.column] > +inputs.number);
      break;
    case 'menor que':
      filterByQuantity = filterPlanet.filter((e) => +e[inputs.column] < +inputs.number);
      break;
    case 'igual a':
      filterByQuantity = filterPlanet.filter((e) => +e[inputs.column] === +inputs.number);
      break;
    default:
      filterByQuantity = filterPlanet;
      break;
    }
    setFiltersPlanet(filterByQuantity);
  };

  const filterName = () => {
    const filterDataName = data
      .filter((e) => e.name.toLowerCase().includes(inputs.name.toLowerCase()));
    setFiltersPlanet(filterDataName);
  };

  useEffect(() => {
    if (inputs.name.length > 0) {
      filterName();
    } else {
      setFiltersPlanet(data);
    }
  }, [inputs.name]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
      setFiltersPlanet(results);
    };
    requestAPI();
  }, []);

  const value = {
    data,
    inputs,
    setInputs,
    filterPlanet,
    setFiltersPlanet,
    filterOperator,
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
