import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('Verificando se existe o botão Enviar Orçamento.', () => {
    render(<App />);
    const btnSend = screen.getByTestId('id-send');
    expect(btnSend).toBeInTheDocument();
    expect(btnSend).toHaveProperty('type', 'button');
    expect(btnSend).toHaveValue('Enviar Orçamento');
  });

  test('alterando o valor dos campos e testando o valor guardado', () => {
    render(<App />);
    const inputNome = screen.getByTestId('callTime');
    expect(inputNome).toBeInTheDocument();
    expect(inputNome).toHaveValue('');
    userEvent.type(inputNome, '10');
    expect(inputNome).toHaveValue('10');
  });

  it('Verificando que, ao digitar no campo tempo de ligação e clicar em Enviar Orçamento, o orçamento é renderizado', () => {
    render(<App />);
    const callTimeInput = screen.getByLabelText('Tempo de ligacao em minutos');
    const btnSend = screen.getByTestId('id-send');
    
    userEvent.type(callTimeInput, "5");
    userEvent.click(btnSend);
    const quoteValueTexts = screen.getAllByTestId('quote-value');
    expect(quoteValueTexts).toHaveLength(2);
  });

  it('Verificando que, ao digitar no campo tempo de ligação um caracter que não seja numero e clicar em Enviar Orçamento, é renderizado um erro', async () => {
    render(<App />);
    const callTimeInput = screen.getByLabelText('Tempo de ligacao em minutos');
    const btnSend = screen.getByTestId('id-send');
    userEvent.type(callTimeInput, "k");
    userEvent.click(btnSend);
    const quoteValue = screen.getByTestId('quote-error');

    expect(quoteValue).toHaveTextContent("Tempo de ligacao em minutos deve ser um número.");
  });

  it('Simula se existe as opções de planos.', () => {
    render(<App />);
  
    expect.assertions(5);
  
    userEvent.selectOptions(screen.getByTestId('select-value-per-minute'), '1.9');
    expect((screen.getByTestId('select-option-0') as HTMLOptionElement).selected).toBeTruthy();
    expect((screen.getByTestId('select-option-1') as HTMLOptionElement).selected).toBeFalsy();
    
    userEvent.selectOptions(screen.getByTestId('select-value-per-minute'), '1.7');
    expect((screen.getByTestId('select-option-2') as HTMLOptionElement).selected).toBeTruthy();
  
    userEvent.selectOptions(screen.getByTestId('select-value-per-minute'), '2.7');
    expect((screen.getByTestId('select-option-3') as HTMLOptionElement).selected).toBeTruthy();
  
    userEvent.selectOptions(screen.getByTestId('select-value-per-minute'), '0.9');
    expect((screen.getByTestId('select-option-4') as HTMLOptionElement).selected).toBeTruthy();
  })
})
