class sucessorClass {
  sucessor(atual) {
    let counter = 0;
    const salas = [];
    const turmas = [];

    const sucessores = [];

    if (atual[0]) {
      // Separa salas e turmas da solução atual
      atual[0].map(turmaAlocada => {
        salas.push(turmaAlocada[0]);
        turmas.push(turmaAlocada[1]);
      });

      // Concatena os arrays das salas que não foram utilizadas com o array das que foram
      const todasAsSalas = salas.concat(atual[1]);

      // Gera uma nova combinação de salas e turmas
      let flag = true;
      while (counter < todasAsSalas.length) {
        let salaAleatoria =
          salas[Math.floor(Math.random() * salas.length - 1) + 1];

        let indexSalaAleatoria = salas.indexOf(salaAleatoria);

        if (turmas[counter] <= salaAleatoria) {
          sucessores.push(salaAleatoria);
          salas.splice(indexSalaAleatoria, 1);
        } else {
          while (
            turmas[counter] > salaAleatoria ||
            salas[counter] === salaAleatoria
          ) {
            salaAleatoria =
              todasAsSalas[
                Math.floor(Math.random() * todasAsSalas.length - 1) + 1
              ];
            indexSalaAleatoria = todasAsSalas.indexOf(salaAleatoria);

            if (turmas[counter] <= salaAleatoria) {
              sucessores.push(salaAleatoria);
              todasAsSalas.splice(indexSalaAleatoria, 1);
            } else {
              continue;
            }
          }
        }
        counter = counter + 1;
      }

      sucessores.map((sala, index) => {
        sucessores[index] = [sala, turmas[index]];
      });
      return sucessores;
    } else {
      return false;
    }
  }
}

export default new sucessorClass();
