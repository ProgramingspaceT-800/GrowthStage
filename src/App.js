// App.js

import React from 'react';
import LineChart from './components/Line/Linechart';
import StartTimeChart from './components/Starttime/startime';
import CompletionRateChart from './components/Completion/CompletionRateChart'
import PausaStatusChart from './components/Pause/PausaStatusChart'
import Navbar from './components/Navbar';

function App() {
  return (
    <div>

      <Navbar/>

      {/* Gráfico de Linha (ASR Over Bases) */}
      <LineChart />

      {/* Gráfico de Barras (Start Time of Campaigns) */}
      <StartTimeChart />

      {/* Outros gráficos ou componentes podem ser adicionados aqui */}

    </div>
  );
}

export default App;
