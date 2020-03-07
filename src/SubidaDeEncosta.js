import avaliaClass from './Avalia';
import sucessorClass from './Sucessora';

class subidaDeEncostaClass {
  subidaDeEncosta(solucaoInicial, valorAvalia) {
    let atual = solucaoInicial;
    let va = valorAvalia;
    let novo = [];
    let vn = 0;

    let flag = true;
    while (flag) {
      novo = sucessorClass.sucessor(atual);
      vn = avaliaClass.avalia(novo['turmasAlocadas']);

      if (vn < va) {
        atual = novo;
        va = vn;
      } else {
        flag = false;
      }
    }

    atual['avaliaSubidaDeEncosta'] = va;
    return atual;
  }
}

export default new subidaDeEncostaClass();
