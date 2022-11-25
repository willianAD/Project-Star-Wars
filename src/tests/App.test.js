import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

describe('Testando funcionalidades da aplicação', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => jest.clearAllTimers());
  const NumberTen = 10;
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

    const fetch = jest.spyOn(global, 'fetch');
    const getPlanet3 = await screen.findByText('Alderaan');
    expect(getPlanet3).toBeInTheDocument();

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const tableBody = table.lastChild;
    expect(tableBody.childNodes.length).toBe(NumberTen);

    const inputName = screen.getByTestId('name-filter');
    await waitFor(() => {
      userEvent.type(inputName, 'o');
    });

    expect(getPlanet3).not.toBeInTheDocument();
    const getPlanet = await screen.findByText('Hoth');
    expect(getPlanet).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);

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

    const getFilter = screen.getByTestId('filter');
    expect(getFilter).toBeInTheDocument();

    expect(getPlanet).not.toBeInTheDocument();

    const getButtonFilter = screen.getByRole('button', { name: 'X' });
    expect(getButtonFilter).toBeInTheDocument();

    userEvent.click(getButtonFilter);
    expect(getButtonFilter).not.toBeInTheDocument();

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
    expect(tableBody.childNodes.length).toBe(1);

    const getClearButton = screen.getByTestId('button-remove-filters');
    userEvent.click(getClearButton);

    expect(tableBody.childNodes.length).toBe(NumberTen);
    expect(tableBody.firstChild.firstChild.innerHTML).toBe('Tatooine');

    const getOrder = screen.getByTestId('column-sort');
    expect(getOrder).toBeInTheDocument();
    const getAsc = screen.getByTestId('column-sort-input-asc');
    expect(getAsc).toBeInTheDocument();
    const getDesc = screen.getByTestId('column-sort-input-desc');
    expect(getDesc).toBeInTheDocument();
    const buttonOrder = screen.getByTestId('column-sort-button');
    expect(buttonOrder).toBeInTheDocument();

    userEvent.type(getOrder, 'population');
    userEvent.click(getAsc);
    userEvent.click(buttonOrder);

    expect(tableBody.firstChild.firstChild.innerHTML).toBe('Yavin IV');
    userEvent.click(getClearButton);
    expect(tableBody.firstChild.firstChild.innerHTML).toBe('Tatooine');

    userEvent.type(getOrder, 'population');
    userEvent.click(getDesc);
    userEvent.click(buttonOrder);
    expect(tableBody.firstChild.firstChild.innerHTML).toBe('Coruscant');

    userEvent.selectOptions(getOrder, 'diameter');
    expect(getOrder.value).toEqual('diameter');
  });
});
