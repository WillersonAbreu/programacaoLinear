class sucessorClass {
  sucessor(atual) {
    const salas = [];
    const turmas = [];

    const sucessor = [];

    atual[0].map(turmaAlocada => {
      salas.push(turmaAlocada[0]);
      turmas.push(turmaAlocada[1]);
    });

    const allSalas = salas.concat(atual[1]);
    console.log(salas);
    console.log('All Salas', allSalas);

    // Quantidade de salas disponíveis para gerar sucessores
    // const salasLength = salas.length + atual[1].length;
    // console.log('Tamanho', salasLength);

    return sucessor;
  }
}

export default new sucessorClass();
