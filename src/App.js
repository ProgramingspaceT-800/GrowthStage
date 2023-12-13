// App.js

import React from 'react';
import LineChart from './components/Line/Linechart';
import StartTimeChart from './components/Starttime/startime';
import CompletionRateChart from './components/Completion/CompletionRateChart'
import PausaStatusChart from './components/Pause/PausaStatusChart'

function App() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Gráfico de Linha (ASR Over Bases) */}
      <LineChart />

      {/* Gráfico de Barras (Start Time of Campaigns) */}
      <StartTimeChart />

      {/* Outros gráficos ou componentes podem ser adicionados aqui */}

      <CompletionRateChart/>

      <PausaStatusChart />
    </div>
  );
}

export default App;
