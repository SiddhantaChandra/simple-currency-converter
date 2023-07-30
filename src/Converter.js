import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { Form } from './Form';

function Converter() {
  const [data, setData] = useState([]);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('GBP');

  useEffect(() => {
    async function getCurrenciesData() {
      const host = 'api.frankfurter.app';
      const res = await fetch(`https://${host}/currencies`);
      const data = await res.json();
      const arr = [];
      for (const key in data) {
        arr.push({ [key]: data[key] });
      }
      setData(arr);
    }
    getCurrenciesData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Form
        data={data}
        fromCur={fromCur}
        setFromCur={setFromCur}
        toCur={toCur}
        setToCur={setToCur}
      />
      <Graph cur1={fromCur} cur2={toCur} />
    </div>
  );
}

export default Converter;
