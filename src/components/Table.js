import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { filterPlanet, setInputs, inputs, filterOperator } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const buttonClick = () => {
    filterOperator();
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
      <label htmlFor="select">
        <select
          name="column"
          id="select"
          data-testid="column-filter"
          value={ inputs.column }
          onChange={ handleChange }
        >
          <option value="population" id="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="select2">
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
              <td>{ e.name }</td>
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
