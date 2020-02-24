// Rotina para avaliar a porcentagem da aucpação dos alunos nas salas em que foram alocados
module.exports = {
  avalia: solucaoInicial => {
    let valorAvalia = 0;

    solucaoInicial.map(sala => {
      console.log(
        'sala',
        sala,
        'Abs',
        Math.abs(sala[0] - sala[1]),
        'Subt',
        sala[0] - sala[1]
      );
      valorAvalia += Math.abs(sala[0] - sala[1]);
    });

    return valorAvalia;
  }
};
