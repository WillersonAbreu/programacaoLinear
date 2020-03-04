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
    const valorAvalia = classAvalia.avalia(solIni[0]);

    // const Sucessora = classSucessor.sucessor(solIni);

    const subidaDeEncosta = classSubidaDeEncosta.subidaDeEncosta(
      solIni,
      valorAvalia
    );

    // Printando os resultados na ordem de chamada das funções
    console.log('Solução Inicial', solIni[0]);
    console.log('Avalia', valorAvalia);
    console.log('Subida de Encosta', subidaDeEncosta[0]);
    console.log('Avalia Subida de Encosta', subidaDeEncosta[0]);
  }
}

export default Main;
