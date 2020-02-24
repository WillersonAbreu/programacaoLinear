const { solucaoInicial } = require('./SolucaoInicial');
const { avalia } = require('./Avalia');

// const avalia = (solucaoInicial, matrizPreco, produtos) => {
//   let valor = 0;

//   Array.from(solucaoInicial).map((item, index) => {
//     if (item !== null || item !== undefined) {
//       valor += matrizPreco[solucaoInicial[index]][index];
//     }
//   });

//   return valor;
// };

const temperaInicial = (MAX, matrizPreco, produtos, lojas) => {
  let soma = 0;
  let count = 0;
  S = [];

  for (let i = 0; i < lojas; i++) {
    const solIni = solucaoInicial(matrizPreco, produtos, lojas, MAX);
    S.push(solIni);
  }

  for (let j = 0; j < lojas - 1; j++) {
    for (let k = 0; k < lojas; k++) {
      // k = j + 1;
      const firstAvalia = avalia(S[j], matrizPreco, produtos);
      const secondAvalia = avalia(S[k], matrizPreco, produtos);
      soma += Math.abs(firstAvalia - secondAvalia);
      count++;
    }
  }

  // console.log(soma, count, (soma / count) * 1000);

  delta = soma / count;
  valor = delta * 1000;
  console.log(`Valor do Delta: ${valor}`);
  return valor;
};

const temperaSimulada = (
  solucaoInicial,
  valor,
  matrizPreco,
  MAX,
  produtos,
  lojas
) => {
  const atual = solucaoInicial;
  const va = avalia(atual, matrizPreco, produtos);

  console.log(`Valor de va: ${va}`);

  console.log(`Valor: ${valor}`);
  const frequencia = 0.8;

  const temperaMaxima = 20;

  let t = 0;

  while (t < temperaMaxima) {
    const { sucessorMelhor: proximo, valorMelhor } = sucessor(
      atual,
      va,
      matrizPreco,
      MAX,
      produtos,
      lojas
    );
    console.log(`Valor de proximo: ${proximo}`);
    const vp = avalia(proximo, matrizPreco, produtos);
    console.log(`Valor de vp: ${vp}`);

    const delta = vp - va;

    if (delta > 0) {
      atual = proximo;
      va = vp;
    } else {
      const ale = Math.round(Math.random());
      console.log(`Aleatorio : ${ale}`);
      const aux = Math.exp(delta / valor);

      if (ale <= aux) {
        atual = proximo;
        va = vp;
      }
    }

    let tempera = valor * frequencia;
    console.log(`Tempera: ${tempera}`);
    t += 1;
  }
};

const sucessor = (atual, va, matrizPreco, MAX, produtos, lojas) => {
  const sucessorMelhor = { ...atual };
  const valorMelhor = va;
  sucessores = [];

  for (let i = 0; i < atual.length; i++) {
    sucessores = atual;

    if (sucessores[i] === 0) {
      sucessores[i] = Math.floor(Math.random() * lojas) + 1;

      const valorSucessor = avalia(sucessores, matrizPreco);

      let proximo = i + 1;

      if (proximo == produtos) proximo = 0;

      while (valorSucessor > MAX) {
        if (sucessores[proximo] !== 0) {
          valorSucessor -= matrizPreco[sucessores[proximo]][proximo];
          sucessores[i] = 0;
        }
        proximo += 1;
        if (proximo === produtos) {
          proximo = 0;
        }
      }

      if (valorSucessor > valorMelhor) {
        valorMelhor = valorSucessor;
        sucessorMelhor = sucessores;
      }
    }
  }

  return sucessorMelhor, valorMelhor;
};

const Main = () => {
  const turmas = [20, 15, 35, 40];
  const salas = [25, 15, 35, 15, 19, 22, 40, 18, 50, 60];

  const solIni = solucaoInicial(turmas, salas);
  const valorAvalia = avalia(solIni);

  console.log('Avalia', valorAvalia);
};

Main();
