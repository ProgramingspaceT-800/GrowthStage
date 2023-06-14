import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function LineChart() {
  const [sData, setSdata] = useState([]);
  const [nvdi, setNvdi] = useState(0);
  const [accumGDD, setAccumGDD] = useState(0);
  const [accumRainfall, setAccumRainfall] = useState(0);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json');
        const data = await response.json();
        const newData = [];

        let totalNvdi = 0;
        let totalAccumGDD = 0;
        let totalAccumRainfall = 0;

        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].time * 1000);
          const month = date.toLocaleString('default', { month: 'short' });
          const degreeDays = data[i].degree_days;
          const precipitation = data[i].precipitation;
          const ndvi = data[i].ndvi;

          if (newData.length === 0 || month !== newData[newData.length - 1].x) {
            newData.push({
              x: month,
              y: [degreeDays, precipitation, ndvi]
            });
          }

          totalNvdi += ndvi;
          totalAccumGDD += degreeDays;
          totalAccumRainfall += precipitation;
        }

        setSdata(newData);
        setNvdi(totalNvdi.toFixed(1));
        setAccumGDD(totalAccumGDD.toFixed(1));
        setAccumRainfall(totalAccumRainfall.toFixed(1));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getChartData();
  }, []);

  return (
    <div className='container-fluid mt-3 mb-3'>
      <h2>Line Chart - Indicators Growth</h2>
      <div className="indicators-summary">
        <p>NVDI: {nvdi}</p>
        <p>Accumulated GDD: {accumGDD}</p>
        <p>Accumulated Rainfall: {accumRainfall}</p>
      </div>
      <Chart
        type='line'
        width={1450}
        height={550}
        series={[
          { name: 'Degree Days', data: sData.map((item) => item.y[0]) },
          { name: 'Precipitation', data: sData.map((item) => item.y[1]) },
          { name: 'NDVI', data: sData.map((item) => item.y[2]) }
        ]}
        options={{
          title: { text: "Indicators Growth Over Time" },
          xaxis: {
            title: { text: "Month" },
            categories: sData.map((item) => item.x)
          },
          yaxis: {
            title: { text: "Degrees Celsius" },
            labels: {
              formatter: function (value) {
                return value.toFixed(1);
              }
            }
          },
          legend: {
            position: 'top'
          }
        }}
      />
    </div>
  );
}

export default LineChart;
