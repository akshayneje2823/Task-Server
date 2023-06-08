import express from 'express';
import { addToCart, booksData, cartDetails, login, register, removeFromCart, } from '../controller/authController.js'
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.route("/register").post(register);

router.route('/login').post(login);

router.route('/books-data').get(booksData);

router.route('/add-to-cart').post(authMiddleware, addToCart);

router.route('/cart-details').get(authMiddleware, cartDetails)

router.route('/remove-from-cart/:id').delete(authMiddleware, removeFromCart)

export default router