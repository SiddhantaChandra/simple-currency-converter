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

    if (fromAmount === '' || fromAmount === '0' || fromCur === toCur) {
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

    if (toAmount === '' || toAmount === '0' || fromCur === toCur) {
      // setIsValid(false);
      return;
    } else {
      if (!canConvert) convert();
    }
  }, [fromCur, toCur, toAmount, canConvert]);

  return (
    <div>
      <div className="rounded-md overflow-hidden mb-6 border-2 border-gray-400">
        <input
          className="h-10 px-4"
          onChange={handleFromAmount}
          value={toAmount === '0' || '' ? 0 : fromAmount}
          onFocus={handleFromConvert}
        />
        <input
          value={fromCur}
          disabled
          className="w-12 text-center h-10 bg-white  border-r-2"
        />
        <select
          id="fromCurrency"
          onChange={(e) => setFromCur(e.target.value)}
          value={fromCur}
          className="px-4 h-10 bg-yellow-500"
        >
          {data.map((cur) => {
            return (
              <option
                key={Object.keys(cur)}
                value={Object.keys(cur)}
                className="p-4"
              >
                {Object.values(cur)}
              </option>
            );
          })}
        </select>
      </div>
      <div className="rounded-md overflow-hidden border-2 border-gray-400">
        <input
          className="h-10 px-4"
          onChange={(e) => {
            setToAmount(e.target.value);
          }}
          value={fromAmount === '0' || '' ? 0 : toAmount}
          onFocus={handleToConvert}
        />
        <input
          value={toCur}
          disabled
          className="w-12 text-center h-10 bg-white border-r-2"
        />
        <select
          id="toCurrency"
          onChange={(e) => setToCur(e.target.value)}
          value={toCur}
          className="px-4 h-10 bg-purple-500 "
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
