import avaliaClass from './Avalia';
import sucessorClass from './Sucessora';

class subidaDeEncostaClass {
  subidaDeEncosta(solucaoInicial, valorAvalia) {
    let atual = solucaoInicial;
    let va = valorAvalia;
    let novo = [];
    let vn = 0;

    // console.log('Solução inicial', atual['turmasAlocadas']);
    // console.log('Valor avalia', valorAvalia);

    let flag = true;
    while (flag) {
      novo = sucessorClass.sucessor(atual);
      // console.log(novo['turmasAlocadas']);
      vn = avaliaClass.avalia(novo['turmasAlocadas']);

      if (vn < va) {
        atual = novo;
        // console.log('Sucessor', atual['turmasAlocadas']);
        va = vn;
        // console.log('Avalia sucessor', va);
      } else {
        // console.log('Sucessor else', atual['turmasAlocadas']);
        // console.log('Avalia else', va);
        flag = false;
      }
    }

    atual['avaliaSubidaDeEncosta'] = va;
    // console.log(atual);
    return atual;
  }
}

export default new subidaDeEncostaClass();
