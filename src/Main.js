import classSolucaoInicial from './SolucaoInicial';
import classAvalia from './Avalia';

class Main {
  constructor() {
    this.runAlgorithms();
  }

  runAlgorithms() {
    // Algoritmos
    const solIni = classSolucaoInicial.solucaoInicial();
    const valorAvalia = classAvalia.avalia(solIni);

    // Printando os resultados na ordem de chamada das funções
    console.log('Solução Inicial', solIni);
    console.log('Avalia', valorAvalia);
  }
}

export default Main;
