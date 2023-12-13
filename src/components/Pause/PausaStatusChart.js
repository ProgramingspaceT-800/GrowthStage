// PausaStatusChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function PausaStatusChart() {
  const [pausaStatusData, setPausaStatusData] = useState([]);
  const [pausaStatusChartData, setPausaStatusChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPausaStatusData() {
      try {
        const apiToken = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq';

        const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns?paused=false&page=1&api_token=${apiToken}`);

        const data = response.data.data;

        console.log('API Response Data for Pausa Status:', data);

        const newPausaStatusData = data.map((campaign) => ({
          name: campaign.name,
          paused: campaign.paused,
        }));

        console.log('Formatted Pausa Status Data:', newPausaStatusData);

        setPausaStatusData(newPausaStatusData);

        const pausedCount = newPausaStatusData.filter((item) => item.paused).length;
        const activeCount = newPausaStatusData.length - pausedCount;

        const chartData = {
          series: [pausedCount, activeCount],
          options: {
            chart: {
              type: 'donut',
            },
            labels: ['Pausada', 'Ativa'],
            title: {
              text: 'Status de Pausa das Campanhas',
              align: 'center',
            },
            dataLabels: {
              enabled: true,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '70%',
                },
              },
            },
          },
        };

        console.log('Pausa Status Chart Data:', chartData);

        setPausaStatusChartData(chartData);
      } catch (error) {
        console.error('Error fetching pausa status data:', error);
        setError('Error fetching pausa status data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPausaStatusData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='container-fluid mt-3 mb-3'>
      <h2>Status de Pausa das Campanhas</h2>
      <Chart
        options={pausaStatusChartData.options}
        series={pausaStatusChartData.series}
        type='donut'
        height={350}
      />
    </div>
  );
}

export default PausaStatusChart;
