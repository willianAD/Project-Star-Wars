import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando funcionalidades da aplicação', () => {
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

    const inputName = screen.getByTestId('name-filter');
    await waitFor(() => {
      userEvent.type(inputName, 'oo');
    });

    const fetch = jest.spyOn(global, 'fetch');
    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
