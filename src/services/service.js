import ProductManager from './dao/mongo/Product.service.js';
import ProductRepository from './repository/ProductRepository.js';

const productManager = new ProductManager();
export const productRepository = new ProductRepository(productManager);


