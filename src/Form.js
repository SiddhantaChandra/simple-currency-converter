import React, { useEffect, useState } from 'react';

export function Form({ data, fromCur, setFromCur, toCur, setToCur }) {
  const [fromAmount, setFromAmount] = useState(5);
  const [toAmount, setToAmount] = useState(0);
  const [canConvert, setCanConvert] = useState(true);

  const handleFromAmount = (e) => {
    setFromAmount(e.target.value);
  };

  const handleFromConvert = () => {
    setFromAmount('');
    setCanConvert(true);
  };

  const handleToConvert = () => {
    setToAmount('');
    setCanConvert(false);
  };

  useEffect(() => {
    async function convert() {
      const host = 'api.frankfurter.app';
      const res = await fetch(
        `https://${host}/latest?amount=${fromAmount}&from=${fromCur}&to=${toCur}`,
      );
      const data = await res.json();
      // setDataConversion(data.rates[toCur] / fromAmount);
      setToAmount(data.rates[toCur]);
    }

    if (fromAmount === '' || fromAmount === 0 || fromCur === toCur) {
      // setIsValid(false);
      return;
    } else {
      if (canConvert) convert();
    }
  }, [fromCur, toCur, fromAmount, canConvert]);

  useEffect(() => {
    async function convert() {
      const host = 'api.frankfurter.app';
      const res = await fetch(
        `https://${host}/latest?amount=${toAmount}&from=${toCur}&to=${fromCur}`,
      );
      const data = await res.json();
      setFromAmount(data.rates[fromCur]);
    }

    if (toAmount === '' || fromCur === toCur) {
      // setIsValid(false);
      return;
    } else {
      if (!canConvert) convert();
    }
  }, [fromCur, toCur, toAmount, canConvert]);

  return (
    <div>
      <div>
        <input
          onChange={handleFromAmount}
          value={fromAmount}
          onFocus={handleFromConvert}
        />
        <input value={fromCur} disabled />
        <select
          id="fromCurrency"
          onChange={(e) => setFromCur(e.target.value)}
          value={fromCur}
        >
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
        <input
          onChange={(e) => {
            setToAmount(e.target.value);
          }}
          value={toAmount}
          onFocus={handleToConvert}
        />
        <input value={toCur} disabled />
        <select
          id="toCurrency"
          onChange={(e) => setToCur(e.target.value)}
          value={toCur}
        >
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
