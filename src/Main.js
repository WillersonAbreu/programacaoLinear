import classSolucaoInicial from './SolucaoInicial';
import classAvalia from './Avalia';
import classSubidaDeEncosta from './SubidaDeEncosta';
import classSubidaDeEncostaTemp from './SubidaDeEncostaTemp';
import classSucessor from './Sucessora';
import classAlgoritmoGenetico from './AlgoritmoGenetico';

const express = require('express');
const faker = require('faker');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 5000;

class Main {
  constructor() {

    app.set('view engine', 'ejs');  
    app.set('views', './views');  
    // app.use(expressLayouts);           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
    app.use(bodyParser.urlencoded());  // Com essa configuração, vamos conseguir parsear o corpo das requisições

    app.use(express.static(__dirname + '/../views/public'));

    app.listen(port, () => {
    console.log(`A mágica acontece em http://localhost:${port}`);
    });
  
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
    
    const temperaSimulada = classSubidaDeEncostaTemp.subidaDeEncosta(
        solIni,
        valorAvalia
    );
    
    const ag = classAlgoritmoGenetico.algoritmoGenetico(10);
    
    // console.log("População inicial: " , pop[0]['turmasAlocadas']);
    // console.log("População inicial: " , pop[0]['salasRemanescentes']);

    let turminha1 = solIni['turmasAlocadas'][0];
    let turminha2 = solIni['turmasAlocadas'][1];
    let turminha3 = solIni['turmasAlocadas'][2];
    let turminha4 = solIni['turmasAlocadas'][3];

    let turminhaSubida1 = subidaDeEncosta['turmasAlocadas'][0];
    let turminhaSubida2 = subidaDeEncosta['turmasAlocadas'][1];
    let turminhaSubida3 = subidaDeEncosta['turmasAlocadas'][2];
    let turminhaSubida4 = subidaDeEncosta['turmasAlocadas'][3];

    let turminhaSubidaAlter1 = subidaDeEncosta1['turmasAlocadas'][0];
    let turminhaSubidaAlter2 = subidaDeEncosta1['turmasAlocadas'][1];
    let turminhaSubidaAlter3 = subidaDeEncosta1['turmasAlocadas'][2];
    let turminhaSubidaAlter4 = subidaDeEncosta1['turmasAlocadas'][3];

    let turminhaTempera1 = temperaSimulada['turmasAlocadas'][0];
    let turminhaTempera2 = temperaSimulada['turmasAlocadas'][1];
    let turminhaTempera3 = temperaSimulada['turmasAlocadas'][2];
    let turminhaTempera4 = temperaSimulada['turmasAlocadas'][3];


    // console.log('Solução Inicial: ', solIni['turmasAlocadas']);
    // console.log('SI Salas Remanescentes', solIni['salasRemanescentes']);
    // console.log('Avalia', valorAvalia);
    
    // console.log('--------------------------------------');
    
    // console.log('Subida de Encosta', subidaDeEncosta['turmasAlocadas']);
    // console.log('SE Salas Remanescentes', subidaDeEncosta['salasRemanescentes']);
    // console.log('Avalia Subida de Encosta', subidaDeEncosta['avaliaSubidaDeEncosta']);
    
    // console.log('--------------------------------------');
    
    // console.log('Subida de Encosta Alterada', subidaDeEncosta1['turmasAlocadas']);
    // console.log('SE Salas Remanescentes Alterada', subidaDeEncosta1['salasRemanescentes']);
    // console.log('Avalia Subida de Encosta Alterada', subidaDeEncosta1['avaliaSubidaDeEncosta']);
    
    // console.log('--------------------------------------');
    
    // console.log('Subida de Encosta Tempera', temperaSimulada['turmasAlocadas']);
    // console.log('SE Salas Remanescentes Tempera', temperaSimulada['salasRemanescentes']);
    // console.log('Avalia Subida de Encosta Tempera', temperaSimulada['avaliaSubidaDeEncosta']);


    app.get('/', (req, res) => {
      res.render('main');
    });

    app.get('/solini', (req, res) => {
      res.render('solucaoInicial', {turminha1: turminha1,
        turminha2: turminha2,
        turminha3: turminha3,
        turminha4: turminha4,
        salasRemanescentes:  solIni['salasRemanescentes'],
        valorAvalia: valorAvalia,
      });
    });

    app.get('/subida', (req, res) => {
      res.render('subidaDeEncosta', {turminha1: turminhaSubida1,
        turminha2 : turminhaSubida2,
        turminha3 : turminhaSubida3,
        turminha4 : turminhaSubida4,
        salasRemanescentes:  subidaDeEncosta['salasRemanescentes'],
        valorAvalia: subidaDeEncosta['avaliaSubidaDeEncosta'],
      });
    });

    app.get('/subidaalterada', (req, res) => {
      res.render('subidaDeEncostaAlter', {turminha1: turminhaSubidaAlter1,
        turminha2 : turminhaSubidaAlter2,
        turminha3 : turminhaSubidaAlter3,
        turminha4 : turminhaSubidaAlter4,
        salasRemanescentes:  subidaDeEncosta1['salasRemanescentes'],
        valorAvalia: subidaDeEncosta1['avaliaSubidaDeEncosta'],});
    });

    app.get('/tempera', (req, res) => {
      res.render('temperaSimulada', {turminha1: turminhaTempera1,
        turminha2 : turminhaTempera2,
        turminha3 : turminhaTempera3,
        turminha4 : turminhaTempera4,
        salasRemanescentes:  temperaSimulada['salasRemanescentes'],
        valorAvalia: temperaSimulada['avaliaSubidaDeEncosta'],});
    });

    app.get('/tables', (req, res) => {
      res.render('tables', {t1_solIni: turminha1,
        t2_solIni: turminha2,
        t3_solIni: turminha3,
        t4_solIni: turminha4,
        salasRem_solIni: solIni['salasRemanescentes'],
        vAvalia_solIni: valorAvalia,
      
        t1_subida: turminhaSubida1,
        t2_subida: turminhaSubida2,
        t3_subida: turminhaSubida3,
        t4_subida: turminhaSubida4,
        salasRem_subida:  subidaDeEncosta['salasRemanescentes'],
        vAvalia_subida: subidaDeEncosta['avaliaSubidaDeEncosta'],

        t1_subidaAlter: turminhaSubidaAlter1,
        t2_subidaAlter: turminhaSubidaAlter2,
        t3_subidaAlter: turminhaSubidaAlter3,
        t4_subidaAlter: turminhaSubidaAlter4,
        salasRem_subidaAlter:  subidaDeEncosta1['salasRemanescentes'],
        vAvalia_subidaAlter: subidaDeEncosta1['avaliaSubidaDeEncosta'],

        t1_tempera: turminhaTempera1,
        t2_tempera: turminhaTempera2,
        t3_tempera: turminhaTempera3,
        t4_tempera: turminhaTempera4,
        salasRem_tempera:  temperaSimulada['salasRemanescentes'],
        vAvalia_tempera: temperaSimulada['avaliaSubidaDeEncosta'],
      });
    });
  };
  
  
  

}

export default Main;
