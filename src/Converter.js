import React, { useEffect, useState } from 'react';
import Graph from './Graph';

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [curData, setCurData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cur1, setCur1] = useState('USD');
  const [cur2, setCur2] = useState('GBP');
  const [amount, setAmount] = useState('10');
  const [checkLength, setCheckLength] = useState(false);

  const fetchCurrencyName = () => {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/currencies`)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        const fetchedKeys = Object.keys(data);
        setCurrencies(fetchedKeys);
      });
  };

  const handleCur1 = (e) => {
    setCur1(e.target.value);
  };

  const handleCur2 = (e) => {
    setCur2(e.target.value);
  };

  // console.log(amount);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    fetchCurrencyName();
  }, []);

  useEffect(() => {
    if (amount.length === 0 || amount === '0') {
      setCheckLength(true);
    } else {
      setCheckLength(false);
      async function fetchCurrencyData() {
        setIsLoading(true);
        const host = 'api.frankfurter.app';
        await fetch(
          `https://${host}/latest?amount=${amount}&from=${cur1}&to=${cur2}`,
        )
          .then((resp) => resp.json())
          .then((data) => {
            setCurData(Object.values(data.rates));
          });
        setIsLoading(false);
      }

      if (cur1 === cur2) return setCurData(amount);

      fetchCurrencyData();
    }
  }, [cur1, cur2, amount]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
          <input
            value={amount}
            onChange={handleAmount}
            className="h8 px-3 border border-black-500 rounded-md bg-yellow-200"
          />
          <select
            name="currency-1"
            id="currency-1"
            onChange={handleCur1}
            className=" h-8 w-20 px-3 border border-black-500 rounded-md"
            value={cur1}
          >
            {currencies.map((cur) => {
              return (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              );
            })}
          </select>
          <select
            name="currency-2"
            id="currency-2"
            onChange={handleCur2}
            className=" h-8 w-20 px-2 border border-black-500 rounded-md"
            value={cur2}
          >
            {currencies.map((cur) => {
              return (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              );
            })}
          </select>
        </form>

        {checkLength ? (
          <h3 className="text-lg font-semibold">
            0 {cur1} = 0 {cur2}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            {amount} {cur1} = {isLoading ? 'Loading' : curData} {cur2}
          </h3>
        )}
      </div>
      <Graph cur1={cur1} cur2={cur2} />
    </div>
  );
}

export default Converter;
