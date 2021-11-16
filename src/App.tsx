import React, { useState, ChangeEvent } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import { sendQuote } from './services/planCalculation'
import { dddsList, plans } from './data/data'
import Header from './components/Header';

interface IFormPlan {
  valuePerMinute: number,
  minutesPerPlane: number,
  callTime: number,
}

interface ItableQuote {
  withoutPlan?: string,
  withPlan?: string,
  error?: string
}

function App() {
  const [formPlan, setFormPlan] = useState<IFormPlan>({
    valuePerMinute: dddsList[0].valuePerMinute, minutesPerPlane: plans[0].minutesPerPlane, callTime: 0,
  });

  const [tableQuote, setTableQuote] = useState<ItableQuote>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormPlan({ ...formPlan, [name]: value });
  }

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFormPlan({ ...formPlan, [name]: value });
  }

  function submit() {
    if (typeof(formPlan.callTime) !== 'number') {
      const parsedCallTime =  parseFloat(formPlan.callTime)
      if (isNaN(parsedCallTime)) {
        setTableQuote({ error: "Tempo de ligacao em minutos deve ser um número." })
      } else {
        setTableQuote(
          sendQuote(
            formPlan.minutesPerPlane,
            formPlan.valuePerMinute,
            parseFloat(formPlan.callTime)
          )
        );
      }
    }
  }

  const renderQuoteResult = () => (
    <div className="App-quote-results">
      <article className="message is-link">
        <div className="message-header">
          Com plano Fale Mais
        </div>
        <div className="message-body">
          <p data-testid="quote-value">
          R$ {(tableQuote?.withPlan)?.toString().replace(".",",")}
          </p>
        </div>
      </article>
      <article className="message is-danger">
        <div className="message-header">
          Sem plano Fale Mais
        </div>
        <div className="message-body">
          <p data-testid="quote-value">
            R$ {(tableQuote?.withoutPlan)?.toString().replace(".",",")}
          </p>
        </div>
      </article>
    </div>
  )

  return (
    <div className="App">
      <Header />
      <div className="App-main-content box">
        <label htmlFor="valuePerMinute">
        <h4 className="title is-4">
          Escolha o DDD de Origem e Destino:
        </h4>
        </label>
        <div className="App-main-content-select select is-info">
          <select
            name="valuePerMinute"
            id="valuePerMinute"
            onChange={handleSelect}
          >
            {dddsList.map(({ destiny, origin, valuePerMinute }, index) => (
              <option
                key={index}
                value={valuePerMinute}
              >
                Origem: {origin} Destino: {destiny}
              </option>
            ))}
          </select>
        </div>
        <div className="App-main-content-select select is-info">
          <select
            name="minutesPerPlane"
            id="minutesPerPlane"
            onChange={handleSelect}
          >
            {plans.map(({ descriptPlan, minutesPerPlane }, index) => (
              <option
                key={index}
                value={minutesPerPlane}
              >
                {descriptPlan} ({minutesPerPlane} minutos)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label id="call-time" htmlFor="callTime">
            <h4 className="title is-4">
              Tempo de ligacao em minutos
            </h4>
            <input
              name="callTime"
              id="callTime"
              data-testid="callTime"
              onChange={handleChange}
              className="input is-info App-main-content-input-call-time"
            />
          </label>
        </div>
        <input
          onClick={submit}
          type="button"
          value="Enviar Orçamento"
          data-testid="id-send"
          className="button"
        />
        <div className="App-quote-results-box">
          {tableQuote?.withPlan && tableQuote?.withoutPlan && renderQuoteResult()}
          {tableQuote?.error &&
            <div className="notification is-danger is-light">
              <p data-testid="quote-error">
                {tableQuote?.error}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
