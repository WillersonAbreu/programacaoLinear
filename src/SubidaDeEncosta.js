import avaliaClass from './Avalia';
import sucessorClass from './Sucessora';

class subidaDeEncostaClass {
  subidaDeEncosta(solucaoInicial, valorAvalia) {
    const atual = solucaoInicial;
    const va = valorAvalia;

    let flag = true;
    while (flag) {
      let novo = sucessorClass.sucessor(atual);
      let vn = avaliaClass.avalia(novo);

      if (vn < va) {
        atual = novo;
        va = vn;
      } else {
        flag = false;
      }
    }
    return atual;
  }
}

export default new subidaDeEncostaClass();
