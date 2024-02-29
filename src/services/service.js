// Repository de Product
import ProductManager from './dao/mongo/Product.service.js';
import ProductRepository from './repository/ProductRepository.js';

const productManager = new ProductManager();
export const productRepository = new ProductRepository(productManager);

// Repository de Cart
import CartManager from './dao/mongo/Cart.service.js';
import CartRepository from './repository/CartRepository.js';

const cartManager = new CartManager();  // Corregido: Cambiado el nombre de la constante
export const cartRepository = new CartRepository(cartManager);  // Corregido: Cambiado el nombre de la constante
