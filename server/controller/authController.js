import { Book } from "../models/BookSchema.js";
import { User } from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";


// register route
export const register = async (req, res, next) => {

    const { username, password, email } = req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res)

    } catch (error) {
        next(error)
    }

}

// login route
export const login = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;


    try {
        if (!email || !password) next(new ErrorResponse("Please provide email and password", 400))

        const user = await User.findOne({ email }).select('+password');

        if (!user) next(new ErrorResponse("User not found", 401));

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) next(new ErrorResponse("password doesn't match", 401))

        sendToken(user, 200, res)

    } catch (error) {
        next(error)
    }

}

// book Data
export const booksData = async (req, res, next) => {
    const data = await Book.find()
    res.status(200).json({ status: "success", data })
};

// Add to cart
export const addToCart = async (req, res, next) => {
    const { books } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse("User not Found", 401))
    }

    user.cart.push(books)
    user.save()

    res.status(200).json({ status: "success", message: "Added to cart" })
}

export const cartDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse("User not Found", 401))
    }
    user.save()
    res.status(200).json({ status: "success", cart: user.cart })
}

// Remove From Cart
export const removeFromCart = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse("User not Found", 401))
    };

    const index = user.cart.find(book => book.id == id);

    if (index === -1) {
        return next(new ErrorResponse("Book Not Found", 404))
    };

    user.cart.splice(index, 1);
    await user.save();

    res.status(200).json({ status: "success", cart: user.cart })
}

// Logout 
export const logout = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse("User not Found", 401))
    };

    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }

        res.json({ message: 'Logged out successfully' });
    });
}

// sending Token
async function sendToken(user, statusCode, res) {

    let token = await user.getSignedToken();

    res.status(statusCode).json({
        success: true,
        token
    })
};
