

import { productRepository } from "../services/service.js"



// Función para obtener todos los productos con filtros y paginación
export async function getProducts(req, res) {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        let productsToSend = await productRepository.getAll();

        // Aplicar el filtro según el parámetro 'query' (nombre del producto)
        if (query) {
            productsToSend = productsToSend.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Aplicar ordenamiento ascendente o descendente según el parámetro 'sort'
        if (sort && (sort === 'asc' || sort === 'desc')) {
            productsToSend.sort((a, b) => {
                if (sort === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        // Calcular la información de paginación
        const totalItems = productsToSend.length;
        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = Math.min(page, totalPages);

        const startIndex = (currentPage - 1) * limit;
        const endIndex = Math.min(startIndex + limit, totalItems);

        // Obtener los productos para la página específica después del filtrado y ordenamiento
        const paginatedProducts = productsToSend.slice(startIndex, endIndex);

        // Construir el objeto de respuesta
        const responseObject = {
            status: 'success',
            payload: paginatedProducts,
            totalPages: totalPages,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            nextPage: currentPage < totalPages ? currentPage + 1 : null,
            currentPage: currentPage,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages,
            prevLink: currentPage > 1 ? `/realtimeproducts?limit=${limit}&page=${currentPage - 1}` : null,
            nextLink: currentPage < totalPages ? `/realtimeproducts?limit=${limit}&page=${currentPage + 1}` : null,
        };

        res.render("realtimeproducts.hbs", { responseObject });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
    }
}
//obtiene los productos para el usuario
export async function getProductsUser(req, res) {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        let productsToSend = await productRepository.getAll();

        // Aplicar el filtro según el parámetro 'query' (nombre del producto)
        if (query) {
            productsToSend = productsToSend.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Aplicar ordenamiento ascendente o descendente según el parámetro 'sort'
        if (sort && (sort === 'asc' || sort === 'desc')) {
            productsToSend.sort((a, b) => {
                if (sort === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        // Calcular la información de paginación
        const totalItems = productsToSend.length;
        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = Math.min(page, totalPages);

        const startIndex = (currentPage - 1) * limit;
        const endIndex = Math.min(startIndex + limit, totalItems);

        // Obtener los productos para la página específica después del filtrado y ordenamiento
        const paginatedProducts = productsToSend.slice(startIndex, endIndex);

        // Construir el objeto de respuesta
        const responseObject = {
            status: 'success',
            payload: paginatedProducts,
            totalPages: totalPages,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            nextPage: currentPage < totalPages ? currentPage + 1 : null,
            currentPage: currentPage,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages,
            prevLink: currentPage > 1 ? `/products?limit=${limit}&page=${currentPage - 1}` : null,
            nextLink: currentPage < totalPages ? `/products?limit=${limit}&page=${currentPage + 1}` : null,
        };

        res.render("productos.hbs", { responseObject });
        //res.json({responseObject})
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
    }
}






// Función para obtener un producto por _id
export async function getProductById(req, res) {
    try {
        const product_id = req.params._id;
        const product = await productRepository.findById(product_id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto por _id:', error);
        res.status(500).json({ error: 'Error al obtener el producto por _id' });
    }
}

// Función para agregar un nuevo producto
export async function addProduct(req, res) {
    try {
        const { title, description, price, thumbnails, code, stock, status } = req.body;

        // Crea un nuevo objeto con la data del body
        const newProduct = {
            title,
            description,
            price: Number(price),
            thumbnails: Array.isArray(thumbnails) ? thumbnails : [thumbnails],
            code,
            stock: Number(stock),
            status: status || true // Si no se provee status, se establece como true por defecto
        };

        // Usa el método addProduct del ProductManager para agregar el producto
        const product = await productRepository.save(newProduct);

        if (product) {
            res.status(201).json(product); // Producto agregado exitosamente
        } else {
            res.status(500).json({ error: 'Error al agregar el producto' }); // Hubo un error al agregar el producto
        }
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Función para actualizar un producto por su ID
export async function updateProductById(req, res) {
    const productId = req.params.id;
    const updatedFields = req.body; // Los campos actualizados estarán en req.body

    try {
        const updatedProduct = await productRepository.update(productId, updatedFields);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


