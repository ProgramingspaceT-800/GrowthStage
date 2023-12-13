import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function LineChart() {
  const [baseData, setBaseData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBaseData() {
      try {
        const apiToken = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq';

        const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns?paused=false&page=1&api_token=${apiToken}`);

        const data = response.data.data;

        console.log('API Response Data:', data);

        const newData = data.map((base) => ({
          name: base.name,
          start_time: base.start_time,
          end_time: base.end_time,
          asr: parseFloat(base.asr),
        }));

        console.log('Formatted Data:', newData);

        setBaseData(newData);

        const chartData = {
          series: [
            { name: 'ASR', data: newData.map((item) => item.asr) },
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
            },
            xaxis: {
              categories: newData.map((item) => item.name),
            },
            title: {
              text: 'ASR Over Bases',
              align: 'center',
            },
          },
        };

        console.log('Chart Data:', chartData);

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchBaseData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='container-fluid mt-3 mb-3'>
      <h2>ASR Over Bases</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type='line'
        height={350}
      />
    </div>
  );
}

export default LineChart;
