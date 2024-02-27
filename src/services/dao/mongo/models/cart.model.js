import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import userModel from './user.model.js';  // Asegúrate de tener la ruta correcta al modelo de usuario
import { Product } from './product.model.js';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,  
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,  
        },
        quantity: Number,
    }],
});

cartSchema.plugin(mongoosePaginate);

const Cart = mongoose.model('Cart', cartSchema);

export { Cart };
