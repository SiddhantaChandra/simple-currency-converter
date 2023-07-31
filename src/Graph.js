import { useState, useEffect } from 'react';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

function Graph({ cur1, cur2 }) {
  const [years, setYears] = useState(1);
  const subtractXYear = (date) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();
  // const formattedDate = formatDate(currentDate);
  const oneYearAgo = subtractXYear(currentDate);
  const formattedOneYearAgo = formatDate(oneYearAgo);
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [lowerLimit, setLowerLimit] = useState(0);
  // console.log(data);
  data.forEach((key) => {
    const dateStr = key.date;
    const dateObj = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = dateObj.toLocaleDateString(undefined, options);
    key.date = newDate;
  });

  useEffect(
    function () {
      const host = 'api.frankfurter.app';
      fetch(`https://${host}/${formattedOneYearAgo}..?from=${cur1}&to=${cur2}`)
        .then((resp) => resp.json())
        .then((data) => {
          const newDataArray = [];
          const rates = [];
          for (const date in data.rates) {
            // console.log(data.rates[date][cur2]);
            const newData = {
              date: date,
              [cur2]: data.rates[date][cur2],
            };
            rates.push(data.rates[date][cur2]);
            newDataArray.push(newData);
          }
          setLowerLimit(Math.min(...rates));
          // console.log(Math.min(...rates));
          setLength(Math.floor(newDataArray.length / 3));
          setData(newDataArray);
        });
    },
    [formattedOneYearAgo, cur1, cur2],
  );

  return (
    <div className="mt-8">
      <div className="flex gap-6 flex-row-reverse mr-7">
        <button
          className={
            years === 1
              ? `bg-purple-500 px-4 py-2 rounded-md`
              : 'bg-yellow-500 px-4 py-2 rounded-md'
          }
          onClick={() => {
            setYears(1);
          }}
        >
          1 Year
        </button>
        <button
          className={
            years === 3
              ? `bg-purple-500 px-4 py-2 rounded-md`
              : 'bg-yellow-500 px-4 py-2 rounded-md'
          }
          onClick={() => {
            setYears(3);
          }}
        >
          3 Year
        </button>
        <button
          className={
            years === 5
              ? `bg-purple-500 px-4 py-2 rounded-md`
              : 'bg-yellow-500 px-4 py-2 rounded-md'
          }
          onClick={() => {
            setYears(5);
          }}
        >
          5 Year
        </button>
      </div>
      <AreaChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeArray="3 3" />
        <XAxis dataKey="date" interval={length} hide />
        <YAxis domain={[lowerLimit, 'auto']} />
        {/* domain={[70, 'auto']}  */}
        <Tooltip />
        <Area type="monotone" dataKey={cur2} stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
}

export default Graph;
