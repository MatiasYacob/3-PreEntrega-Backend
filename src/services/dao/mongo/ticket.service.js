import Ticket from "./models/ticket.model.js";
import { Cart } from "./models/cart.model.js";
import userModel from "./models/user.model.js";
import { sendTicketByEmail } from "../../../controllers/EmailController.js";  



class TicketManager {
    constructor() {}

    async createTicket(userId) {
        try {
            const cart = await Cart.findOne({ user: userId });

            if (!cart || cart.products.length === 0) {
                throw new Error('No hay productos en el carrito para crear un ticket.');
            }

            const user = await userModel.findById(userId);
            const ticket = new Ticket({
                purchase_datetime: new Date(),
                amount: this.calculateTotalAmount(cart.products),
                purchaser: user.email,
                products: cart.products,// hay que arreglar esto, seguramente es porque es un array de objetos
            });

            await ticket.save();

            // Elimina todos los productos del carrito después de crear el ticket
            await Cart.findOneAndUpdate({ user: userId }, { $set: { products: [] } });

            console.log('Ticket creado exitosamente.');

            // Llama al controlador de correo para enviar el ticket al usuario
            await sendTicketByEmail(user.email, ticket);

            return ticket;
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            throw error;
        }
    }

    async getTicketsByUser(userId) {
        try {
            const user = await userModel.findById(userId);
    
            if (!user) {
                console.log('Usuario no encontrado.');
                return [];
            }
    
            const tickets = await Ticket.find({ purchaser: user.email });
    
            console.log('Tickets obtenidos exitosamente para el usuario:', user.email);
            
            return tickets;
        } catch (error) {
            console.error('Error al obtener los tickets:', error);
            throw error;
        }
    }

    // Otras funciones relacionadas con la gestión de tickets...

    // Función para calcular el monto total basado en los productos del carrito
    calculateTotalAmount(products) {
        return products.reduce((total, product) => total + product.quantity * product.price, 0);
    }
}

export default TicketManager;
