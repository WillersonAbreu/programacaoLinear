import avaliaClass from './Avalia';
import sucessorClass from './Sucessora';

class subidaDeEncostaClass {
  subidaDeEncosta(solucaoInicial, valorAvalia) {
    let atual = solucaoInicial;
    let va = valorAvalia;
    let subidaDeEncosta = [];

    let flag = true;
    while (flag) {
      let novo = sucessorClass.sucessor(atual);
      let vn = avaliaClass.avalia(novo);

      if (!vn) {
        continue;
      } else {
        if (vn < va) {
          subidaDeEncosta.push(novo);
          subidaDeEncosta.push(vn);
        } else {
          flag = false;
        }
      }
    }
    return [subidaDeEncosta, va];
  }
}

export default new subidaDeEncostaClass();
