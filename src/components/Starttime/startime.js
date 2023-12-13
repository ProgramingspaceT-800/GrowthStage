// StartTimeChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function StartTimeChart() {
  const [startTimeData, setStartTimeData] = useState([]);
  const [startTimeChartData, setStartTimeChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStartTimeData() {
      try {
        const apiToken = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq';

        const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns?paused=false&page=1&api_token=${apiToken}`);

        const data = response.data.data;

        console.log('API Response Data for Start Time:', data);

        const newStartTimeData = data.map((campaign) => ({
          name: campaign.name,
          start_time: campaign.start_time,
        }));

        console.log('Formatted Start Time Data:', newStartTimeData);

        setStartTimeData(newStartTimeData);

        const chartData = {
          series: [
            { name: 'Start Time', data: newStartTimeData.map((item) => item.start_time) },
          ],
          options: {
            chart: {
              height: 350,
              type: 'bar',
            },
            xaxis: {
              categories: newStartTimeData.map((item) => item.name),
            },
            title: {
              text: 'Start Time of Campaigns',
              align: 'center',
            },
          },
        };

        console.log('Start Time Chart Data:', chartData);

        setStartTimeChartData(chartData);
      } catch (error) {
        console.error('Error fetching start time data:', error);
        setError('Error fetching start time data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchStartTimeData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='container-fluid mt-3 mb-3'>
      <h2>Start Time of Campaigns</h2>
      <Chart
        options={startTimeChartData.options}
        series={startTimeChartData.series}
        type='bar'
        height={350}
      />
    </div>
  );
}

export default StartTimeChart;
