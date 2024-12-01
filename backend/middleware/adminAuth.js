import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({
                status: false,
                message: "Not Authorizes Login again",
            })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                status: false,
                message: "Access denied. No token provided.",
            })
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        })
    }
}

export default adminAuth;