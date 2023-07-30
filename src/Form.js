import React, { useEffect, useState } from 'react';

export function Form({ data, fromCur, setFromCur, toCur, setToCur }) {
  const [fromAmount, setFromAmount] = useState(2);
  const [toAmount, setToAmount] = useState(10);
  const [conversionData, setConversionData] = useState({});

  console.log(conversionData);

  const handleFromAmount = (e) => {
    setFromAmount(e.target.value);
  };

  const handleToAmount = (e) => {
    setToAmount(e.target.value);
  };

  const handleFromCur = (e) => {
    const userValue = e.target.value;
    console.log(userValue);
    setFromCur(userValue);
  };

  const handleToCur = (e) => {
    const userValue = e.target.value;

    setToCur(userValue);
  };

  useEffect(() => {
    async function convert() {
      const host = 'api.frankfurter.app';
      const res = await fetch(
        `https://${host}/latest?amount=${fromAmount}&from=${fromCur}&to=${toCur}`,
      );
      const data = await res.json();
      setConversionData(data.rates[toCur] / fromAmount);
      setToAmount(data.rates[toCur]);
    }
    convert();
  }, [fromCur, toCur, fromAmount]);

  return (
    <div>
      <div>
        <input onChange={handleFromAmount} value={fromAmount} />
        <input value={fromCur} disabled />
        <select id="fromCurrency" onChange={handleFromCur} value={fromCur}>
          {data.map((cur) => {
            return (
              <option key={Object.keys(cur)} value={Object.keys(cur)}>
                {Object.values(cur)}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <input onChange={handleToAmount} value={toAmount} />
        <input value={toCur} disabled />
        <select id="toCurrency" onChange={handleToCur} value={toCur}>
          {data.map((cur) => {
            return (
              <option key={Object.keys(cur)} value={Object.keys(cur)}>
                {Object.values(cur)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
