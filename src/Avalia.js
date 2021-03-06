// Rotina para avaliar a porcentagem da aucpação dos alunos nas salas em que foram alocados
class Avalia {
  avalia(solucaoInicial) {
    let valorAvalia = 0;
    const valorPI = 0.8;
    const resultados = [];
    solucaoInicial.map(sala => {
      resultados.push(sala[1] / sala[0]);
    });
    resultados.map(result => {
      valorAvalia += Math.abs(result - valorPI);
    });
    // valorAvalia = valorAvalia.toFixed(5);
    return valorAvalia;
  }
}

export default new Avalia;
