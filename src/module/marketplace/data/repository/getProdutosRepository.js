const getProdutosRepository = (axios) => async () => {
  try {
    const response = await axios.get("/products");
    return response.data ?? [];
  } catch (error) {
    throw new Error("Error fetching produtos: " + error.message);
  }
};

export default getProdutosRepository;