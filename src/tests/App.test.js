import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetchApi from './helpers/fetchApi';

describe('Testando funcionalidades da aplicação', () => {
  global.fetch = fetchApi;
  it('Verifica se tem os inputs selects e botão na tela', () => {
    render(<App />);

    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();

    const selectColumn = screen.getByTestId('column-filter');
    expect(selectColumn).toBeInTheDocument();

    const selectQuantity = screen.getByTestId('comparison-filter');
    expect(selectQuantity).toBeInTheDocument();

    const inputValue = screen.getByTestId('value-filter');
    expect(inputValue).toBeInTheDocument();

    const getButton = screen.getByTestId('button-filter');
    expect(getButton).toBeInTheDocument();
  });

  it('Verifica se é renderizado o retorno da API', async () => {
    render(<App />);

    const getPlanet3 = await screen.findByText('Alderaan');
    expect(getPlanet3).toBeInTheDocument();

    const inputName = screen.getByTestId('name-filter');
    await waitFor(() => {
      userEvent.type(inputName, 'o');
    });

    expect(getPlanet3).not.toBeInTheDocument();
    const getPlanet = await screen.findByText('Hoth');
    expect(getPlanet).toBeInTheDocument();
    const fetch = jest.spyOn(global, 'fetch');
    expect(fetch).toHaveBeenCalledTimes(0);

    const getPlanet2 = await screen.findByText('Tatooine');
    expect(getPlanet2).toBeInTheDocument();
    const getPlanet4 = await screen.findByText('Naboo');
    expect(getPlanet4).toBeInTheDocument();
    const getPlanet5 = await screen.findByText('Dagobah');
    expect(getPlanet5).toBeInTheDocument();
    const getPlanet6 = await screen.findByText('Tatooine');
    expect(getPlanet6).toBeInTheDocument();

    const getColumn = screen.getByTestId('column-filter');
    const getQuantity = screen.getByTestId('comparison-filter');
    const getValue = screen.getByTestId('value-filter');
    const getButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(getColumn, 'diameter');
    userEvent.selectOptions(getQuantity, 'maior que');
    userEvent.type(getValue, '9000');
    userEvent.click(getButton);

    expect(getPlanet).not.toBeInTheDocument();

    userEvent.selectOptions(getColumn, 'surface_water');
    userEvent.selectOptions(getQuantity, 'menor que');
    userEvent.type(getValue, '10');
    userEvent.click(getButton);

    expect(getPlanet4).not.toBeInTheDocument();

    userEvent.selectOptions(getColumn, 'orbital_period');
    userEvent.selectOptions(getQuantity, 'igual a');
    userEvent.type(getValue, '304');
    userEvent.click(getButton);

    expect(getPlanet5).not.toBeInTheDocument();
    expect(getPlanet6).toBeInTheDocument();

    const getClearButton = screen.getByTestId('button-remove-filters');
    userEvent.click(getClearButton);
  });
});
