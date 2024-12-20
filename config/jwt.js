const jwt = require("jsonwebtoken");

// Function to generate JWT (place outside of exported functions):
exports.generateAuthToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
    };
    const secret = process.env.JWT_SECRET; // Use a strong environment variable for secret

    return jwt.sign(payload, secret, { expiresIn: "24h" }); // Set appropriate expiry time
};

// Function to verify JWT
exports.verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};