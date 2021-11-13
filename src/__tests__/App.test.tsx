import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('Verifica os elementos da tela de orçamento', () => {

  it('Verificando se existe o campo Tempo de ligação em minutos.', () => {
    render(<App />);
    const callTimeInput = screen.getByLabelText('Tempo de ligacao em minutos');
    expect(callTimeInput).toBeInTheDocument();
    expect(callTimeInput).toHaveProperty('type', 'text');
  });

  // test('Verificando se existe as opções de planos.', async () => {
  //   userEvent.selectOptions(screen.getByRole('listbox'), [ 30, 60])

  //   const options = await screen.findByRole('option', { name: "FaleMais 30", hidden: true })

  //   expect( options.onselect).toBe(true)
  // })

  // test('Verificando se existe as opções de planos.', () => {
  //   render(<App />);
  //   const callTimeInput = screen.getByLabelText('Escolha seu Plano');
  //   expect(callTimeInput).toBeInTheDocument();
  //   expect(callTimeInput).toHaveProperty('type', 'number');
  // });

  it('Verificando se existe o botão Enviar Orçamento.', () => {
    render(<App />);
    const btnSend = screen.getByTestId('id-send');
    expect(btnSend).toBeInTheDocument();
    expect(btnSend).toHaveProperty('type', 'button');
    expect(btnSend).toHaveValue('Enviar Orçamento');
  });

  it('Verificando que, ao digitar no campo tempo de ligação e clicar em Enviar Orçamento, o orçamento é renderizado', () => {
    render(<App />);
    const callTimeInput = screen.getByLabelText('Tempo de ligacao em minutos');
    const btnSend = screen.getByTestId('id-send');
    const quoteValueTexts = screen.getAllByTestId('quote-value');

    userEvent.type(callTimeInput, "5");
    userEvent.click(btnSend);

    expect(quoteValueTexts).toHaveLength(2);
  });

  it('Verificando que, ao digitar no campo tempo de ligação um numero no formato de string e clicar em Enviar Orçamento, é renderizado um erro', () => {
    render(<App />);
    const callTimeInput = screen.getByLabelText('Tempo de ligacao em minutos');
    const btnSend = screen.getByTestId('id-send');
    const quoteValue = screen.getByTestId('quote-error');

    userEvent.type(callTimeInput, "k");
    userEvent.click(btnSend);

    expect(quoteValue).toHaveTextContent("Tempo de ligacao em minutos deve ser um número.")
  });

})