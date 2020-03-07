import classSolucaoInicial from './SolucaoInicial';
import classAvalia from './Avalia';
import classSubidaDeEncosta from './SubidaDeEncosta';
import classSucessor from './Sucessora';

class Main {
  constructor() {
    this.runAlgorithms();
  }

  runAlgorithms() {
    // Algoritmos
    const solIni = classSolucaoInicial.solucaoInicial();
    const valorAvalia = classAvalia.avalia(solIni['turmasAlocadas']);
    const subidaDeEncosta = classSubidaDeEncosta.subidaDeEncosta(
      solIni,
      valorAvalia
    );

    // Imprimindo os resultados na ordem de chamada das funções
    console.log('Solução Inicial', solIni['turmasAlocadas']);
    console.log('Avalia', valorAvalia);
    console.log('Subida de Encosta', subidaDeEncosta['turmasAlocadas']);
    console.log(
      'Avalia Subida de Encosta',
      subidaDeEncosta['avaliaSubidaDeEncosta']
    );
  }
}

export default Main;
