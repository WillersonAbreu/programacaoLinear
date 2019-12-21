const avalia = (solucaoInicial, matrizPreco, produtos) => {
  let valor = 0;

  let i = 0;
  console.log(solucaoInicial);
  // while (i < produtos) {
  //   if (solucaoInicial[i] === 0) {
  //     valor += matrizPreco[solucaoInicial[i]][i];
  //   }
  //   i++;
  // }

  // for (let i = 0; i < solucaoInicial.length; i++) {
  //   if (solucaoInicial[i] === 0) {
  //     valor += matrizPreco[solucaoInicial[i]][i];
  //   }
  // }
  return valor;
};

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
    console.log(`Vaor de proximo: ${proximo}`);
    const vp = avalia(proximo, matrizPreco, produtos);
    console.log(`Valor de vp: ${vp}`);

    const delta = vp - va;

    if (delta > 0) {
      atual = proximo;
      va = vp;
    } else {
      const ale = Math.round(Math.random());
      console.log(`Aleatorio : ${ale}`);
      const aux = Math.exp(delta / tempera);

      if (ale <= aux) {
        atual = proximo;
        va = vp;
      }
    }

    let tempera = tempera * frequencia;
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

const solucaoInicial = (precos, produtos, lojas, MAX) => {
  let S = [];
  let valor = 0;

  for (let i = 0; i < produtos; i++) {
    S.push(0);
  }

  let y = 0;
  let x = 0;

  while (valor < MAX) {
    x = Math.floor(Math.random() * lojas) + 1;
    y = Math.floor(Math.random() * produtos) + 1;

    // Prevent try to access undefined index from array
    x === 5 ? (x = x - 1) : x;

    S[y] = x;

    valor += precos[x][y];
  }

  S[y] = 0;

  return S;
};

const Main = () => {
  const matrizPreco = [
    [4, 31, 32, 31, 44, 44, 20, 39, 28, 47],
    [5, 26, 40, 28, 46, 39, 18, 40, 19, 32],
    [3, 25, 36, 33, 50, 45, 17, 38, 23, 36],
    [4, 39, 36, 27, 40, 40, 19, 36, 16, 48],
    [3, 21, 36, 32, 42, 42, 16, 37, 14, 31]
  ];

  let produtos = 10; // Nº de produtos para ser vendidos
  let lojas = 5; // Nº de lojas
  let MAX = 200; // Valor máximo que pode ser gasto

  const solIni = solucaoInicial(matrizPreco, produtos, lojas, MAX);

  const resAvalia = avalia(solIni, matrizPreco, produtos);

  const valor = temperaInicial(MAX, matrizPreco, produtos, lojas);

  const tempSimulada = temperaSimulada(
    solIni,
    valor,
    matrizPreco,
    MAX,
    produtos,
    lojas
  );
};

Main();
