import {
  multiplePricePerMinuteWithoutPlan,
  multiplePricePerMinuteWithPlan,
  sendQuote,
} from '../services/planCalculation';
import { plans, dddsList } from '../data/mock/datamock'

describe('Testa a função multiplePricePerMinuteWithoutPlan()', () => {
  it('Verifica se a multiplicação da função multiplePricePerMinuteWithoutPlan() retorna o calcúlo correto', () => {
    expect.assertions(7)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[0].valuePerMinute, plans[0].minutesPerPlane)).toEqual(57)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[1].valuePerMinute, plans[1].minutesPerPlane)).toEqual(174)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[2].valuePerMinute, plans[1].minutesPerPlane)).toEqual(102)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[3].valuePerMinute, plans[2].minutesPerPlane)).toEqual(324)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[4].valuePerMinute, plans[0].minutesPerPlane)).toEqual(27)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[5].valuePerMinute, plans[2].minutesPerPlane)).toEqual(228)
    expect(multiplePricePerMinuteWithoutPlan(dddsList[5].valuePerMinute, plans[0].minutesPerPlane)).toEqual(57)
  })
});

describe('Testa a função multiplePricePerMinuteWithPlan()', () => {
  it('Verifica se a multiplicação da função multiplePricePerMinuteWithPlan() retorna o calcúlo correto', () => {
    expect.assertions(4)
    expect(multiplePricePerMinuteWithPlan(plans[0].minutesPerPlane, dddsList[0].valuePerMinute, 20)).toEqual(0)
    expect(multiplePricePerMinuteWithPlan(plans[1].minutesPerPlane, dddsList[2].valuePerMinute, 80)).toEqual(37.4)
    expect(multiplePricePerMinuteWithPlan(plans[2].minutesPerPlane, dddsList[5].valuePerMinute, 200)).toEqual(167.2)
    expect(multiplePricePerMinuteWithPlan(plans[0].minutesPerPlane, dddsList[5].valuePerMinute, 100)).toEqual(146.3)
  })
  it('Verifica se ao passar parâmetro 0 a multiplicação da função multiplePricePerMinuteWithPlan() retorna o valor 0', () => {
    expect.assertions(3)
    expect(multiplePricePerMinuteWithPlan(plans[0].minutesPerPlane, dddsList[0].valuePerMinute, 0)).toEqual(0)
    expect(multiplePricePerMinuteWithPlan(plans[1].minutesPerPlane, dddsList[2].valuePerMinute, 10)).toEqual(0)
    expect(multiplePricePerMinuteWithPlan(plans[2].minutesPerPlane, dddsList[5].valuePerMinute, -5)).toEqual(0)
  })
});

describe('Testa a função sendQuote()', () => {
  it('Verifica se a multiplicação da função sendQuote() retorna o calcúlo correto', () => {
    expect.assertions(4)
    expect(sendQuote(30, 1.90, 20)).toEqual({ withoutPlan: 38, withPlan: 0, })
    expect(sendQuote(60, 1.70, 80)).toEqual({ withoutPlan: 136, withPlan: 37.40, })
    expect(sendQuote(120, 1.90, 200)).toEqual({ withoutPlan: 380, withPlan: 167.20, })
    expect(sendQuote(30, 1.90, 100)).toEqual({ withoutPlan: 190, withPlan: 146.3, })
  })

  it('Verifica se ao passar parâmetro callTime com o valor 0 a multiplicação da função sendQuote() retorna o valor 0', () => {
    expect(sendQuote(60, 1.70, 0)).toEqual({ withoutPlan: 0, withPlan: 0 })
  })
});