import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { handleName, filterPlanet } = useContext(AppContext);
  // const [filterPlanet, setFilters] = useState([]);

  return (
    <>
      <h1>Projeto Star Wars Trybe</h1>
      <label htmlFor="name">
        <input id="name" data-testid="name-filter" onChange={ handleName } />
      </label>
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
