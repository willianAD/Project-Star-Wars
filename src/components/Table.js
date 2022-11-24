import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { data, filterPlanet, setFiltersPlanet, setInputs, inputs,
    filterOperator } = useContext(AppContext);
  const [saveFilters, setSaveFilters] = useState([]);
  const [select, setSelect] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const buttonClick = () => {
    const { column, quantity, number } = inputs;
    const obj = { column, quantity, number };
    filterOperator();
    setSaveFilters([...saveFilters, obj]);
    setSelect((col) => col.filter((e) => e !== inputs.column));
    setInputs({
      name: '',
      column: 'population',
      quantity: 'maior que',
      number: 0,
    });
  };

  const buttonRemoveFilters = () => {
    setFiltersPlanet(data);
    setSaveFilters([]);
    setSelect([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  };

  const buttonRemoveOneFilter = (column) => {
    setSaveFilters((remove) => remove.filter((e) => e !== column));
    setSelect([...select, column]);
    setSaveFilters([]);
    setFiltersPlanet(data);
  };

  const buttonOrder = () => {
    const orderAsc = (a, b) => +a[order.column] - +b[order.column];
    const orderDesc = (a, b) => +b[order.column] - +a[order.column];

    const orderData = filterPlanet.filter((e) => e[order.column] !== 'unknown');
    const orderUnknown = filterPlanet.filter((e) => e[order.column] === 'unknown');

    let orderPlanet = [];
    if (order.sort === 'ASC') {
      orderPlanet = orderData.sort(orderAsc);
    } else {
      orderPlanet = orderData.sort(orderDesc);
    }
    const orderResult = [...orderPlanet, ...orderUnknown];
    setFiltersPlanet(orderResult);
  };

  return (
    <>
      <h1>Projeto Star Wars Trybe</h1>
      <label htmlFor="name">
        <input
          name="name"
          id="name"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <p />
      <label htmlFor="select">
        Coluna:
        <select
          name="column"
          id="select"
          data-testid="column-filter"
          value={ inputs.column }
          onChange={ handleChange }
        >
          { select.map((e, i) => <option key={ i } value={ e } id={ e }>{ e }</option>) }
        </select>
      </label>
      <label htmlFor="select2">
        Operador:
        <select
          name="quantity"
          id="select2"
          data-testid="comparison-filter"
          value={ inputs.quantity }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          name="number"
          id="number"
          data-testid="value-filter"
          type="number"
          value={ inputs.number }
          onChange={ handleChange }
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ buttonClick }>
        Filtrar
      </button>
      <label htmlFor="selectOrder">
        Ordenar:
        <select
          name="columnOrder"
          id="selectOrder"
          data-testid="column-sort"
          onChange={ (e) => setOrder((prevState) => (
            { ...prevState, column: e.target.value })) }
          defaultValue={ order.column }
        >
          { select.map((e, i) => <option key={ i } value={ e } id={ e }>{ e }</option>) }
        </select>
      </label>
      <label htmlFor="input-asc">
        <input
          id="input-asc"
          type="radio"
          data-testid="column-sort-input-asc"
          name="sort"
          value="ASC"
          onChange={ (e) => setOrder((prevState) => (
            { ...prevState, sort: e.target.value })) }
        />
        Ascendente
      </label>
      <label htmlFor="input-desc">
        <input
          id="input-desc"
          type="radio"
          data-testid="column-sort-input-desc"
          name="sort"
          value="DESC"
          onChange={ (e) => setOrder((prevState) => (
            { ...prevState, sort: e.target.value })) }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ buttonOrder }
      >
        Ordenar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ buttonRemoveFilters }
      >
        Remover Filtros
      </button>
      { saveFilters.map((e, i) => (
        <div key={ i } data-testid="filter">
          <span>{ e.column }</span>
          <span>{ e.quantity }</span>
          <span>{ e.number }</span>
          <button
            type="button"
            onClick={ () => buttonRemoveOneFilter(e.column) }
          >
            X
          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrian</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filterPlanet.map((e) => (
            <tr key={ e.name }>
              <td data-testid="planet-name">{ e.name }</td>
              <td>{ e.rotation_period }</td>
              <td>{ e.orbital_period }</td>
              <td>{ e.diameter }</td>
              <td>{ e.climate }</td>
              <td>{ e.gravity }</td>
              <td>{ e.terrain }</td>
              <td>{ e.surface_water }</td>
              <td>{ e.population }</td>
              <td>{ e.films }</td>
              <td>{ e.created }</td>
              <td>{ e.edited }</td>
              <td>{ e.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
