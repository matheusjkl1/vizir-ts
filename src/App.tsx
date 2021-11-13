import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { sendQuote } from './services/planCalculation'
import { dddsList, plans } from './data/data'

interface IFormPlan {
  valuePerMinute: number,
  minutesPerPlane: number,
  callTime: number
}

interface IquoteTable {
  withoutPlan?: number,
  withPlan?: number,
  error?: string
}

function App() {
  const [formPlan, setFormPlan] = useState<IFormPlan>({
    valuePerMinute: dddsList[0].valuePerMinute, minutesPerPlane: plans[0].minutesPerPlane, callTime: 0 
  });

  const [tableQuote, setTableQuote] = useState<IquoteTable>();

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
            formPlan.callTime
          )
        );
      }
    }
  }

  return (
    <div className="App">
      <label htmlFor="ddd">Choose DDD Origin and Destiny:</label>
      <div>
        <select name="ddd" id="ddd" onChange={handleSelect}>
          {dddsList.map(({ destiny, origin, valuePerMinute }, index) => (
            <option key={index} value={valuePerMinute}>Origin: {origin} Destiny: {destiny}</option>
          ))}
        </select>
      </div>
      <label htmlFor="plan">Escolha seu Plano:</label>
      <select name="plan" id="plan" onChange={handleSelect}>
        {plans.map(({ descriptPlan, minutesPerPlane }, index) => (
          <option  key={index} value={minutesPerPlane}>{descriptPlan} ({minutesPerPlane} minutos)</option>
        ))}
      </select>
      <label id="call-time" htmlFor="callTime">
        Tempo de ligacao em minutos
        <input name="callTime" id="callTime" onChange={handleChange}/>
      </label>
      <input onClick={submit} type="button" value="Enviar Orçamento" data-testid="id-send" />
      <div>
        <p data-testid="quote-value">{tableQuote?.withPlan}</p>
        <p data-testid="quote-value">{tableQuote?.withoutPlan}</p>
        <p data-testid="quote-error">{tableQuote?.error}</p>
      </div>
    </div>
  );
}

export default App;
