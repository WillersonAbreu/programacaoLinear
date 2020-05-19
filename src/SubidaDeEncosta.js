import avaliaClass from './Avalia';
import sucessorClass from './Sucessora';

class subidaDeEncostaClass {
  subidaDeEncosta(solucaoInicial, valorAvalia) {
    
    // let atual = solucaoInicial;
    let va = valorAvalia;
    let novo = [];
    let vn = 0;

    let atual = [];

    atual['turmasAlocadas'] = solucaoInicial['turmasAlocadas'].map((arr) => arr.slice());
    atual['salasRemanescentes'] = [...solucaoInicial['salasRemanescentes']];


    let flag = true;
    let t = 0;
    let tmax = 10;

    while (flag) {
      novo = sucessorClass.sucessor(atual);
      vn = avaliaClass.avalia(novo['turmasAlocadas']);
      if (vn < va) {
        atual = novo;
        va = vn;
        t = 0;
        console.log(t);

      } else {
        if (t >= tmax) {
          flag = false;
        }else{
          t++;
        console.log(t);
        }
       
      }
    }

    atual['avaliaSubidaDeEncosta'] = va;
    return atual;
  }
}

export default new subidaDeEncostaClass();
