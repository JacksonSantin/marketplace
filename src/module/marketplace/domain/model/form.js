class Form {
  constructor({
    nome = "",
    telefone = "",
    email = "",
    cidade = "",
    estado = "",
  } = {}) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.cidade = cidade;
    this.estado = estado;
  }
}

export default Form;
