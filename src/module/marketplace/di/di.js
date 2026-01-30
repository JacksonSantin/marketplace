import axiosInstance from "./axios";
import marketController from "../controller/marketController";

import getProdutosRepository from "../data/repository/getProdutosRepository";
import getProdutosUseCase from "../domain/usecase/getProdutosUseCase";

const getProdutosRepositoryImpl = getProdutosRepository(axiosInstance);
const getProdutosUseCaseImpl = getProdutosUseCase({
  getProdutosRepository: getProdutosRepositoryImpl,
});

export const marketControllerImpl = marketController({
  getProdutosUseCase: getProdutosUseCaseImpl,
});
