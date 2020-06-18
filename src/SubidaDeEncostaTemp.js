import avaliaClass from './Avalia';
import sucessorClass from './Sucessora';

class subidaDeEncostaTempClass {
  subidaDeEncosta(solucaoInicial, valorAvalia) {
    
    // let atual = solucaoInicial;
    let va = valorAvalia;
    let novo = [];
    let vn = 0;

    let atual = [];

    atual['turmasAlocadas'] = solucaoInicial['turmasAlocadas'].map((arr) => arr.slice());
    atual['salasRemanescentes'] = [...solucaoInicial['salasRemanescentes']];

    let temp = 5000;
    let ft_red = 0.4; 

    let delta = null;
    let ndelta = null;

    let ale = null;
    let aux = null;
    let resul = null;

    let flag = true;

    while (flag) {

    
      novo = sucessorClass.sucessor(atual);
      vn = avaliaClass.avalia(novo['turmasAlocadas']);
      
      delta = vn - va;
      
      if (delta < 0) {
        
        atual = novo;
        va = vn;


      } else {

        ale = Math.random(0,1);
        ale = parseFloat(ale.toFixed(3))

        ndelta = delta * -1;
        resul = ndelta / temp;
        aux = resul.toExponential(3);
        
        if (ale <= aux) {
          atual = novo;
          va = vn;
        }
    
        temp = temp * ft_red;
        temp = parseFloat(temp.toFixed(3));
        
        console.log('temperatura: ', temp);

        if(temp <= 0) {
          flag = false;
      }
      }
    }

    atual['avaliaSubidaDeEncosta'] = va;
    return atual;
  }
}

export default new subidaDeEncostaTempClass();
