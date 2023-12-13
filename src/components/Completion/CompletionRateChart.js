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
    async function fetchAllPages(apiToken, currentPage = 1) {
      try {
        const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns?paused=false&page=${currentPage}&api_token=${apiToken}`);

        const data = response.data.data;

        console.log(`API Response Data for Completion Rate (Page ${currentPage}):`, data);

        const newCompletionRateData = data.map((campaign) => ({
          name: campaign.name,
          completion_rate: campaign.exit_manual_mode === 30 ? 1 : 0,
        }));

        console.log(`Formatted Completion Rate Data (Page ${currentPage}):`, newCompletionRateData);

        setCompletionRateData((prevData) => [...prevData, ...newCompletionRateData]);

        // Continue fetching next page if available
        if (response.data.meta.current_page < response.data.meta.last_page) {
          fetchAllPages(apiToken, currentPage + 1);
        } else {
          // All pages processed, generate chart data
          const chartData = {
            series: [
              { name: 'Completion Rate', data: completionRateData.map((item) => item.completion_rate) },
            ],
            options: {
              chart: {
                height: 350,
                type: 'bar',
              },
              xaxis: {
                categories: completionRateData.map((item) => item.name),
              },
              title: {
                text: 'Completion Rate of Campaigns',
                align: 'center',
              },
            },
          };

          console.log('Completion Rate Chart Data:', chartData);

          setCompletionRateChartData(chartData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching completion rate data:', error);
        setError('Error fetching completion rate data. Please try again later.');
        setLoading(false);
      }
    }

    const apiToken = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq';
    fetchAllPages(apiToken);
  }, [completionRateData]); // Adicionando completionRateData como dependência para acionar o fetchAllPages quando ele é atualizado

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
        series={completionRateChartData.series}
        type='bar'
        height={350}
      />
    </div>
  );
}

export default CompletionRateChart;
