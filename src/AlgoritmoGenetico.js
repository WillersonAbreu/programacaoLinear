import classSolucaoInicial from './SolucaoInicial';
import classAvalia from './Avalia';
import sucessorClass from './Sucessora';

class algoritmoGenetico {
    algoritmoGenetico(tp) {

        var populacao = []; 
        var solIni2;
       
        for (var i = 0; i <= tp; i++) {
          solIni2 = classSolucaoInicial.solucaoInicial();
          populacao.push(solIni2);
        };
            
        let fit = aptidao(tp);

        for (let index = 0; index < tp; index++) {
          console.log(populacao[index]['turmasAlocadas']);
          console.log(fit[index]);
        }
        let tc = 0.8
        var desc = cruzamento(populacao, fit, tc, tp);

        for(var i = 0; i < 8; i++) {
            console.log("descendente "+ (i + 1) +":", desc[i]);
        }

        function aptidao(tp){

          let f = [];
          let soma = 0;
          
          for (let index = 0; index < tp; index++) {
              f.push(1/classAvalia.avalia(populacao[index]['turmasAlocadas']));
              soma += f[index];
          }

          for (let index = 0; index < tp; index++) {
            f[index] = f[index] /soma;
          }

          return f;
        }

        function cruzamento(populacao, fit, tc, tp) {
          //quantidade de cruzamentos  
          let qc = Math.ceil(tp*tc);
          //ponto de corte
          
          // let corte = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          let corte = 2;

          let d = [];

          //executar o cruzamento para gerar descendentes
          for (let index = 0; index < qc; index++) {
              //seleciona o primeiro pai  
              //gera o numero aleatório
              let ale = Math.random();
              //verifica qual pai será escolhido
              let soma_fit = 0;

              let j = 0;

              while (soma_fit < ale){
                soma_fit += fit[j];
                j++;
              }

              j--;
            
              let p1 = j;

              //seleciona o segundo pai  
              //gera o numero aleatório
              ale = Math.random();

              //verifica qual pai será escolhido
              j = 0;

              soma_fit = 0;
            
              while (soma_fit < ale){
                soma_fit += fit[j];
                j++;
              }
              
              j--;
              
              let p2 = j;
              
              //descendente 1
             
              let linha = [];
             
              linha.push(populacao[p1]["turmasAlocadas"].slice(0, corte));
              linha.push(populacao[p2]["turmasAlocadas"].slice(corte));
              
              d.push(linha[0].concat(linha[1]));
    

              //descendente 2

              linha = [];
              linha.push(populacao[p2]["turmasAlocadas"].slice(0, corte));
              linha.push(populacao[p1]["turmasAlocadas"].slice(corte));
              
              d.push(linha[0].concat(linha[1]));
                  
          }
            return d;
        }
       
        
  }
}

export default new algoritmoGenetico();
