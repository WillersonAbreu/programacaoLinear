import classSolucaoInicial from './SolucaoInicial';
import classAvalia from './Avalia';
import sucessorClass from './Sucessora';

class algoritmoGenetico {
  algoritmoGenetico(tp, tc, tm, ig, ng) {


    let populacao = populacao_inicial(tp)

    // console.log(populacao['turmasAlocadas']);
    // console.log(populacao['salasRemanescentes']);

    let melhor_solucao = [];

    for (let index = 0; index < ng; index++) {

      let fitness = aptidao(populacao, ig);

      let descen = cruzamento(populacao, fitness, tc, tp);

      let descen_mutado = mutacao(descen, tp, tm);
      
      let nova_populacao = aptidao_dos_desc(populacao, descen_mutado, tp, ig);

      melhor_solucao = aptidao_da_nova_pop(nova_populacao);

      populacao['turmasAlocadas'] = JSON.parse(JSON.stringify(nova_populacao['turmasAlocadas']));
      populacao['salasRemanescentes'] = JSON.parse(JSON.stringify(nova_populacao['salasRemanescentes']));
    
    }

    return melhor_solucao;

    //FUNÇÕES 

    //POPULAÇAO INICIAL
    function populacao_inicial(tp) {
      let pop_inicial = [];
      let solIni = [];
      let solIni2 = [];
      let solIni3 = [];

      for (let i = 0; i < tp; i++) {
        solIni.push(classSolucaoInicial.solucaoInicial());
        solIni2.push(solIni[i]['turmasAlocadas']);
        solIni3.push(solIni[i]['salasRemanescentes']);
      };
      pop_inicial['turmasAlocadas'] = solIni2;
      pop_inicial['salasRemanescentes'] = solIni3;
      return pop_inicial;
    }

    //FITNESS
    function aptidao(populacao) {

      let f = [];
      let fit = [];
      let soma = 0;

      for (let i = 0; i < populacao['turmasAlocadas'].length; i++) {
        f.push(1 / classAvalia.avalia(populacao['turmasAlocadas'][i]));
        soma += f[i];
      }

      for (let i = 0; i < populacao['turmasAlocadas'].length; i++) {
        fit[i] = f[i] / soma;
      }  
      return fit;

    }

    //FITNESS DOS DESCENDENTES
    function aptidao_dos_desc(populacao, desc_mutado, tp, ig) {

      let f_pop = [];
      let f_desc = [];

      let fit_pop = [];

      let soma_pop = 0;
      let soma_desc = 0;

      let qg = Math.ceil(tp * ig);
      let resto_de_individuos = tp - qg;

      let selecionados_da_pop = [];
      let selecionados_do_desc = [];

      let turmas_velha_pop = [];
      let salas_velha_pop = [];

      let turmas_velha_desc = [];
      let salas_velha_desc = [];

      let prototipo_nova_pop = [];
      let prototipo_nova_pop2 = [];


      let nova_populacao = [];

      for (let i = 0; i < populacao['turmasAlocadas'].length; i++) {
        f_pop.push(1 / classAvalia.avalia(populacao['turmasAlocadas'][i]));
        soma_pop += f_pop[i];
      }

      for (let i = 0; i < populacao['turmasAlocadas'].length; i++) {
        fit_pop[i] = f_pop[i] / soma_pop;
      }
 

      for (let c = 0; c < qg; c++) {

        let max = 0;
        let atual = 0;

        for (let i = 0; i < populacao['turmasAlocadas'].length; i++) {

          if (fit_pop[i] > max && selecionados_da_pop.indexOf(i) == -1) {
            max = fit_pop[i];
            atual = i;
          }
         
        }
        selecionados_da_pop.push(atual);

      }

      selecionados_da_pop.forEach(function (s){
        turmas_velha_pop.push(populacao['turmasAlocadas'][s]);
        salas_velha_pop.push(populacao['salasRemanescentes'][s]);
      });
      
      prototipo_nova_pop['turmasAlocadas'] = JSON.parse(JSON.stringify(turmas_velha_pop));
      prototipo_nova_pop['salasRemanescentes'] = JSON.parse(JSON.stringify(salas_velha_pop));

     

      for (let i = 0; i < desc_mutado['turmasAlocadas'].length; i++) {
        f_desc.push(1 / classAvalia.avalia(desc_mutado['turmasAlocadas'][i]));
        soma_desc += f_desc[i];
      }

      
      // console.log(f_desc);
      for (let c = 0; c < resto_de_individuos; c++) {

        let max2 = 0;
        let atual2 = 0;

        for (let i = 0; i < desc_mutado['turmasAlocadas'].length; i++) {

          if (f_desc[i] > max2 && selecionados_do_desc.indexOf(i) == -1) {
            max2 = f_desc[i];
            atual2 = i;
          }
        }

        selecionados_do_desc.push(atual2);
      }

      selecionados_do_desc.forEach(function (s){
        turmas_velha_desc.push(desc_mutado['turmasAlocadas'][s]);
        salas_velha_desc.push(desc_mutado['salasRemanescentes'][s]);
      });

      prototipo_nova_pop2['turmasAlocadas'] = JSON.parse(JSON.stringify(turmas_velha_desc));
      prototipo_nova_pop2['salasRemanescentes'] = JSON.parse(JSON.stringify(salas_velha_desc));
       
      let pegatudo = [];
      let pegatudo2 = [];
     
      prototipo_nova_pop['turmasAlocadas'].forEach(function(ind){
        pegatudo.push(ind);
      });

      prototipo_nova_pop['salasRemanescentes'].forEach(function(ind){
        pegatudo2.push(ind);
      });

      prototipo_nova_pop2['turmasAlocadas'].forEach(function(ind){
        pegatudo.push(ind);
      });

      prototipo_nova_pop2['salasRemanescentes'].forEach(function(ind){
        pegatudo2.push(ind);
      });

      nova_populacao['turmasAlocadas'] = JSON.parse(JSON.stringify(pegatudo));
      nova_populacao['salasRemanescentes'] = JSON.parse(JSON.stringify(pegatudo2));

      // console.log('todas turmasAlocadas', nova_populacao['turmasAlocadas']);
      // console.log('todas salasRemanescentes', nova_populacao['salasRemanescentes']);
      
    
      return nova_populacao;
    }

    //FITNESS DA NOVA POPULAÇAO
    function aptidao_da_nova_pop(nova_pop) {

      let f_nova_pop = [];
      let fit_nova_pop = [];

      let soma_nova_pop = 0;
      let selecionados_da_nova = [];
      let selecionado_final = [];

      for (let i = 0; i < nova_pop['turmasAlocadas'].length; i++) {
        f_nova_pop.push(1 / classAvalia.avalia(nova_pop['turmasAlocadas'][i]));
        soma_nova_pop += f_nova_pop[i];
      }

      for (let i = 0; i < nova_pop['turmasAlocadas'].length; i++) {
        fit_nova_pop[i] = f_nova_pop[i] / soma_nova_pop;
      }


      for (let c = 0; c < 1; c++) {

        let max = 0;
        let atual = 0;

        for (let i = 0; i < nova_pop['turmasAlocadas'].length; i++) {

          if (fit_nova_pop[i] > max && selecionados_da_nova.indexOf(i) == -1) {
            max = fit_nova_pop[i];
            atual = i;
          }
        }

        selecionados_da_nova.push(atual);
      }

      selecionados_da_nova.forEach(function(s){
        selecionado_final['turmasAlocadas'] = JSON.parse(JSON.stringify(nova_pop['turmasAlocadas'][s]));
        selecionado_final['salasRemanescentes'] = JSON.parse(JSON.stringify(nova_pop['salasRemanescentes'][s]));
        selecionado_final['valorAvalia'] = classAvalia.avalia(nova_pop['turmasAlocadas'][s]);
      })

      // console.log("Individuo selecionado: ",selecionado_final['turmasAlocadas']);
      // console.log(selecionado_final['salasRemanescentes']);
      // console.log("Avalia: ",selecionado_final['valorAvalia']);
    
      return selecionado_final;

    }
    


    // GERAR DESCENDENTES  
    function cruzamento(populacao, fit, tc, tp) {

      let qc = Math.ceil(tp * tc);
      let corte = Math.ceil(Math.random() * (3 - 1)) + 1;

    
      // console.log('ponto de corte: ', corte);
      // let d2 = [];
      // let d3 = [];

      let todos_desc = [];
      let todos_descendentes = [];

      let todas_sal = [];
      
      //executar o cruzamento para gerar descendentes
      for (let index = 0; index < qc; index++) {
      
      let descendente = [];
      let salas_remanescentes = [];

      //seleciona o primeiro pai  
      //gera o numero aleatório
      let aleatorio = Math.random();
      
      //verifica qual pai será escolhido
      let soma_fit = 0;
      let j = 0;

      while (soma_fit < aleatorio) {
         soma_fit += fit[j];
        j++;
      }
      j--;
  
      let p1 = j;


      //seleciona o segundo pai  

      let aleatorio2 = Math.random();

      let soma_fit2 = 0;
      let j2 = 0;

      while (soma_fit2 < aleatorio2) {
         soma_fit2 += fit[j2];
        j2++;
      }
      j2--;
  
      let p2 = j2;

      while (p1 == p2) {

        aleatorio2 = Math.random();
        soma_fit2 = 0;
        j2 = 0;

        while (soma_fit2 < aleatorio2) {
          soma_fit2 += fit[j2];
          j2++;
        }
        j2--;
    
        p2 = j2;

      }

      //descendente 1

      let linha = [];
      let arr = [];
      let arr2 = [];

      for (let j = 0; j < 4; j++) {
        arr.push(populacao['turmasAlocadas'][p1][j]);
        arr2.push(populacao['turmasAlocadas'][p2][j]);
      }

      linha.push(arr.slice(0, corte));
      linha.push(arr2.slice(corte));

      descendente.push(linha[0].concat(linha[1]));
    
      salas_remanescentes.push(populacao['salasRemanescentes'][p2]);

      // descendente 2

      let linha2 = [];

      linha2.push(arr2.slice(0, corte));
      linha2.push(arr.slice(corte))

      descendente.push(linha2[0].concat(linha2[1]));
          
      salas_remanescentes.push(populacao['salasRemanescentes'][p1]);

      descendente.forEach(function(des) {
        todos_desc.push(des);
      });

      salas_remanescentes.forEach(function(sal){
        todas_sal.push(sal);
      });
        
    }

      todos_descendentes['turmasAlocadas'] = JSON.parse(JSON.stringify(todos_desc));
      todos_descendentes['salasRemanescentes'] = JSON.parse(JSON.stringify(todas_sal));

      // console.log('todas turmas alocadas', todos_descendentes['turmasAlocadas']);
      // console.log('todas salas de fora', todos_descendentes['salasRemanescentes']);

      return todos_descendentes;
    }


    // MUTAÇÃO
    function mutacao(descen, tp, tm) {

      let qm = Math.ceil(tp * tm);

      let copia_descendente = [];

      copia_descendente['turmasAlocadas'] = JSON.parse(JSON.stringify(descen['turmasAlocadas']));
      copia_descendente['salasRemanescentes'] = JSON.parse(JSON.stringify(descen['salasRemanescentes']));

      
      let mutacoes = [];

      let todas_mutacoes_alocadas = [];
      let todas_mutacoes_restantes = [];

      for (let i = 0; i < qm; i++) {

        //   escolhendo descendente

        //gera numero entre 0 e 15
        let desc_aleatorio = Math.floor(Math.random() * (16 - 0)) + 1;
        desc_aleatorio--;

        //escolhendo a casa desse descendente
        //gera numero entre 0 e 3
        let casa_aleatoria = Math.floor(Math.random() * (4 - 0)) + 1;
        
        casa_aleatoria--;
        
        // console.log('descendente selecionado', copia_descendente['turmasAlocadas'][desc_aleatorio]);
        // console.log(copia_descendente['salasRemanescentes'][desc_aleatorio]);

        // console.log('casa aleatoria selecionada', casa_aleatoria);

        //guardar sala selecionada
        let guarda_sala = copia_descendente['turmasAlocadas'][desc_aleatorio][casa_aleatoria][0];

        //escolhendo sala remanescente

        //gera numero entre 0 e 6
        let sala_aleatoria = Math.floor(Math.random() * (6 - 0)) + 1;
        sala_aleatoria--;
        
        let sala_res_selecionada = copia_descendente['salasRemanescentes'][desc_aleatorio][sala_aleatoria];
        
        // console.log('guarda', guarda_sala);
        // console.log('Sala res selecionada', sala_res_selecionada);

        copia_descendente['turmasAlocadas'][desc_aleatorio][casa_aleatoria][0] = sala_res_selecionada;
        
        let contador = 0;

        while (copia_descendente['turmasAlocadas'][desc_aleatorio][casa_aleatoria][0] < copia_descendente['turmasAlocadas'][desc_aleatorio][casa_aleatoria][1]) {
          
          sala_aleatoria = Math.floor(Math.random() * (6 - 0)) + 1;
          sala_aleatoria--;

          sala_res_selecionada = copia_descendente['salasRemanescentes'][desc_aleatorio][sala_aleatoria];
          
          copia_descendente['turmasAlocadas'][desc_aleatorio][casa_aleatoria][0] = sala_res_selecionada;

          contador++;

          if(contador == 6){
            break;
          }
          // console.log('Sala res selecionada', sala_res_selecionada);        
        }

        copia_descendente['salasRemanescentes'][desc_aleatorio][sala_aleatoria] = guarda_sala;

        // console.log('descendente selecionado', copia_descendente['turmasAlocadas'][desc_aleatorio]);
        // console.log(copia_descendente['salasRemanescentes'][desc_aleatorio]);
        
        todas_mutacoes_alocadas.push(copia_descendente['turmasAlocadas'][desc_aleatorio]);
        todas_mutacoes_restantes.push(copia_descendente['salasRemanescentes'][desc_aleatorio]);

      }
        mutacoes['turmasAlocadas'] = JSON.parse(JSON.stringify(todas_mutacoes_alocadas));
        mutacoes['salasRemanescentes'] = JSON.parse(JSON.stringify(todas_mutacoes_restantes));

        // console.log('todas salas mutadas:' ,mutacoes['turmasAlocadas']);
        // console.log('todas salas restantes mutadas:' ,mutacoes['salasRemanescentes']);

        for (let i = 0; i < qm; i++) {
          let ultima_posicao = descen['turmasAlocadas'].length;
          descen['turmasAlocadas'][ultima_posicao] = mutacoes['turmasAlocadas'][i];
          descen['salasRemanescentes'][ultima_posicao] = mutacoes['salasRemanescentes'][i];
        }

        // console.log('previsto para ter todas:' ,descen['turmasAlocadas']);
        // console.log('previsto para ter todas:' ,descen['salasRemanescentes']);

        return descen;
    }

    }
  }
export default new algoritmoGenetico();