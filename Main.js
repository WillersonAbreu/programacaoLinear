const { solucaoInicial } = require('./SolucaoInicial');
const { avalia } = require('./Avalia');

const Main = () => {
  const solIni = solucaoInicial();
  const valorAvalia = avalia(solIni);
  console.log('Solução Inicial', solIni);
  console.log('Avalia', valorAvalia);
};

Main();
