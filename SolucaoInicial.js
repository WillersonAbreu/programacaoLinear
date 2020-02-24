// Rotina para gerar solução inicial
module.exports = {
  solucaoInicial: (turmas, salas) => {
    let turmasAlocadas = [];
    let counter = 0;

    while (counter < turmas.length) {
      salaAleatoria = salas[Math.floor(Math.random() * salas.length - 1) + 1];
      indexSalaAleatoria = salas.indexOf(salaAleatoria);

      if (turmas[counter] <= salaAleatoria) {
        turmasAlocadas.push(salaAleatoria);
        salas.splice(indexSalaAleatoria, 1);
      } else {
        continue;
      }
      counter = counter + 1;
    }

    turmasAlocadas.map((sala, index) => {
      turmasAlocadas[index] = [sala, turmas[index]];
    });

    counter = 0;

    return turmasAlocadas;
  }
};
