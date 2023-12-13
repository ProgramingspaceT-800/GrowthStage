// CompletionRateChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function CompletionRateChart() {
  const [completionRateData, setCompletionRateData] = useState([]);
  const [completionRateChartData, setCompletionRateChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompletionRateData() {
      try {
        const apiToken = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq';

        const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns?paused=false&page=1&api_token=${apiToken}`);

        const data = response.data.data;

        console.log('API Response Data for Completion Rate:', data);

        const newCompletionRateData = data.map((campaign) => ({
          name: campaign.name,
          completion_rate: campaign.exit_manual_mode === 30 ? 1 : 0,
        }));

        console.log('Formatted Completion Rate Data:', newCompletionRateData);

        setCompletionRateData(newCompletionRateData);

        const chartData = {
          series: newCompletionRateData.map((item) => item.completion_rate),
          options: {
            chart: {
              height: 350,
              type: 'bar',
              stacked: true,
            },
            xaxis: {
              categories: newCompletionRateData.map((item) => item.name),
            },
            title: {
              text: 'Completion Rate of Campaigns',
              align: 'center',
            },
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              offsetY: -20,
            },
          },
        };

        console.log('Completion Rate Chart Data:', chartData);

        setCompletionRateChartData(chartData);
      } catch (error) {
        console.error('Error fetching completion rate data:', error);
        setError('Error fetching completion rate data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCompletionRateData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='container-fluid mt-3 mb-3'>
      <h2>Completion Rate of Campaigns</h2>
      <Chart
        options={completionRateChartData.options}
        series={[{ data: completionRateChartData.series }]}
        type='bar'
        height={350}
      />
    </div>
  );
}

export default CompletionRateChart;
