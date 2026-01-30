const getProdutosUseCase = (repository) => async () => {
  try {
    return await repository.getProdutosRepository();
  } catch (error) {
    throw new Error("Error in getProdutosUseCase: " + error.message);
  }
};

export default getProdutosUseCase;