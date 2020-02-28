// Rotina para gerar solução inicial
class solucaoInicial {
  geraTurma(tamanho, limite, start) {
    if (!start) start = 0;

    const turma = [];
    for (let i = 0; i < tamanho; i++) {
      const alunos = start + Math.ceil(Math.random() * (limite - start));
      turma.push(alunos);
    }
    return turma;
  }

  geraSala(tamanho, limite, start) {
    if (!start) start = 0;

    const sala = [];
    for (let i = 0; i < tamanho; i++) {
      const capacidade = start + Math.ceil(Math.random() * (limite - start));
      sala.push(capacidade);
    }
    return sala;
  }

  solucaoInicial() {
    let turmasAlocadas = [];
    let counter = 0;

    const turmas = this.geraTurma(4, 40, 15);
    const salas = this.geraSala(10, 60, 15);

    while (counter < turmas.length) {
      let salaAleatoria =
        salas[Math.floor(Math.random() * salas.length - 1) + 1];
      let indexSalaAleatoria = salas.indexOf(salaAleatoria);

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
}

export default new solucaoInicial();
