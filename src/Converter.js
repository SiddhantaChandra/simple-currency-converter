import React, { useEffect, useState } from 'react';

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [curData, setCurData] = useState();

  const [cur1, setCur1] = useState('USD');
  const [cur2, setCur2] = useState('GBP');
  const [amount, setAmount] = useState('10');
  const [checkLength, setCheckLength] = useState(false);

  const fetchCurrencyName = () => {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/currencies`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
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

  console.log(amount);

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
      const fetchCurrencyData = () => {
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${amount}&from=${cur1}&to=${cur2}`)
          .then((resp) => resp.json())
          .then((data) => {
            setCurData(Object.values(data.rates));
          });
      };

      fetchCurrencyData();
    }
  }, [cur1, cur2, amount]);

  return (
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
        >
          <option key={cur1} value={cur1}>
            {cur1}
          </option>
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
          {amount} {cur1} = {curData} {cur2}
        </h3>
      )}
    </div>
  );
}

export default Converter;
