// LineChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function LineChart() {
  const [baseData, setBaseData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllPages(apiToken, currentPage = 1, pageSize = 10) {
      try {
        const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns?paused=false&page=${currentPage}&api_token=${apiToken}&per_page=${pageSize}`);

        const data = response.data.data;

        console.log(`API Response Data (Page ${currentPage}):`, data);
        const newData = data
          .filter((base) => (!base.name.startsWith('R') && !base.name.startsWith('E')))
          .map((base) => ({
            name: base.name,
            start_time: base.start_time,
            end_time: base.end_time,
            asr: parseFloat(base.asr),
          }));

        console.log(`Formatted Data (Page ${currentPage}):`, newData);

        setBaseData((prevData) => [...prevData, ...newData]);

        if (response.data.meta.current_page < response.data.meta.last_page && baseData.length < 10) {
          fetchAllPages(apiToken, currentPage + 1, pageSize);
        } else {
          updateChartData();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    }

    const updateChartData = () => {
      // Take only the first 10 campaigns
      const slicedBaseData = baseData.slice(0, 10);
    
      const chartData = {
        series: [
          { name: 'ASR', data: slicedBaseData.map((item) => item.asr) },
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            foreColor: '#fff',  // White text color
          },
          xaxis: {
            categories: slicedBaseData.map((item) => item.name),
            labels: {
              style: {
                colors: '#fff',  // White text color
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: '#fff',  // White text color
              },
            },
          },
          title: {
            text: 'ASR Over Bases',
            align: 'center',
            style: {
              color: '#fff',  // White text color
            },
          },
          stroke: {
            curve: 'smooth',
            colors: ['#ff0000'],  // Red line color
          },
        },
      };
    
      console.log('Chart Data:', chartData);
    
      setChartData(chartData);
      setLoading(false);
    };
    
    const apiToken = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq';
    fetchAllPages(apiToken);
  }, [baseData]);

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
