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
    if (inputs.quantity === 'maior que') {
      filterByQuantity = filterPlanet.filter((e) => +e[inputs.column] > +inputs.number);
    } else if (inputs.quantity === 'menor que') {
      filterByQuantity = filterPlanet.filter((e) => +e[inputs.column] < +inputs.number);
    } else {
      filterByQuantity = filterPlanet.filter((e) => +e[inputs.column] === +inputs.number);
    }
    setFiltersPlanet(filterByQuantity);
    return filterByQuantity;
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
