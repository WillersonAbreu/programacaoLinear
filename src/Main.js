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
      valorAvalia,
      0
    );
    const subidaDeEncosta1 = classSubidaDeEncosta.subidaDeEncosta(
      solIni,
      valorAvalia,
      50
    );
   
    console.log('Solução Inicial', solIni['turmasAlocadas']);
    console.log('SI Salas Remanescentes', solIni['salasRemanescentes']);
    console.log('Avalia', valorAvalia);
    console.log('Subida de Encosta', subidaDeEncosta['turmasAlocadas']);
    console.log('SE Salas Remanescentes', subidaDeEncosta['salasRemanescentes']);
    console.log('Avalia Subida de Encosta', subidaDeEncosta['avaliaSubidaDeEncosta']);
    console.log('Subida de Encosta Alterada', subidaDeEncosta1['turmasAlocadas']);
    console.log('SE Salas Remanescentes Alterada', subidaDeEncosta1['salasRemanescentes']);
    console.log('Avalia Subida de Encosta Alterada', subidaDeEncosta1['avaliaSubidaDeEncosta']);
  }
}

export default Main;
