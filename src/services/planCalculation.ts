function multiplePricePerMinuteWithoutPlan(price: number, callTime: number) {
  return price * callTime;
}

function multiplePricePerMinuteWithPlan(minutesPerPlane: number, price: number, callTime: number) {
  const excessMinutes = callTime - minutesPerPlane;
  const increasePercentage = 0.1;
  if (excessMinutes > 0) {
    const sumAcress = (excessMinutes * price) * increasePercentage;
    return (excessMinutes * price) + sumAcress;
  }

  return 0
}

function sendQuote(minutesPerPlane: number, valuePerMinute: number, callTime: number) {
  const quoteWithoutPlan = multiplePricePerMinuteWithoutPlan(valuePerMinute, callTime);
  const quotewithPlan = multiplePricePerMinuteWithPlan(minutesPerPlane, valuePerMinute, callTime);

  return {
    withoutPlan: quoteWithoutPlan,
    withPlan: quotewithPlan,
  };
}

export {
  multiplePricePerMinuteWithoutPlan,
  multiplePricePerMinuteWithPlan,
  sendQuote,
};