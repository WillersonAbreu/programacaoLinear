class sucessorClass {
  sucessor(atual) {
    let iteration = 10;
    let counter = 0;
    let atualCopy = atual;
    let salas = [];
    let turmas = [];
    let sucessores = [];

    let resposta = [];

    // Separa salas e turmas da solução atual
    atual['turmasAlocadas'].map(t => {
      salas.push(t[0]);
      turmas.push(t[1]);
    });

    // Salas que nâo foram usadas na solução
    let salasRemanescentes = atual['salasRemanescentes'];

    for (let i = 0; i < iteration; i++) {
      // Gera uma nova combinação de salas e turmas
      while (counter < salas.length + salasRemanescentes.length) {
        let salaAleatoria =
          salas[Math.floor(Math.random() * salas.length - 1) + 1];

        let indexSalaAleatoria = salas.indexOf(salaAleatoria);

        if (turmas[counter] <= salaAleatoria) {
          sucessores.push(salaAleatoria);
          salas.splice(indexSalaAleatoria, 1);
        } else {
          let index = 0;
          while (turmas[counter] > salaAleatoria) {
            salaAleatoria =
              salas[Math.floor(Math.random() * salas.length - 1) + 1];

            indexSalaAleatoria = salas.indexOf(salaAleatoria);

            if (turmas[counter] <= salaAleatoria) {
              sucessores.push(salaAleatoria);
              salas.splice(indexSalaAleatoria, 1);
            }
            index = index + 1;
            continue;
          }
          // continue;
          // salaAleatoria =
          //   salasRemanescentes[
          //     Math.floor(Math.random() * salasRemanescentes.length - 1) + 1
          //   ];

          // indexSalaAleatoria = salasRemanescentes.indexOf(salaAleatoria);

          // if (turmas[counter] <= salaAleatoria) {
          //   sucessores.push(salaAleatoria);
          //   salasRemanescentes.splice(indexSalaAleatoria, 1);
          // }

          // while (turmas[counter] > salaAleatoria) {
          //   salaAleatoria =
          //     salasRemanescentes[
          //       Math.floor(Math.random() * salasRemanescentes.length - 1) + 1
          //     ];

          //   indexSalaAleatoria = salasRemanescentes.indexOf(salaAleatoria);

          //   if (turmas[counter] <= salaAleatoria) {
          //     sucessores.push(salaAleatoria);
          //     salasRemanescentes.splice(indexSalaAleatoria, 1);
          //   }
          // }
        }
        counter = counter + 1;
      }
    }

    sucessores.map((sala, index) => {
      sucessores[index] = [sala, turmas[index]];
    });

    resposta['turmasAlocadas'] = sucessores;
    resposta['salasRemanescentes'] = salas.concat(salasRemanescentes);

    return resposta;
  }
}

export default new sucessorClass();
