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
   
    console.log('Solução Inicial', solIni['turmasAlocadas']);
    console.log('SI Salas Remanescentes', solIni['salasRemanescentes']);
    console.log('Avalia', valorAvalia);
    console.log('Subida de Encosta', subidaDeEncosta['turmasAlocadas']);
    console.log('SE Salas Remanescentes', subidaDeEncosta['salasRemanescentes']);
    console.log(
      'Avalia Subida de Encosta',
      subidaDeEncosta['avaliaSubidaDeEncosta']
    );
  }
}

export default Main;
