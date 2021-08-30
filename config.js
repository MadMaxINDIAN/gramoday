const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    IP: process.env.IP,
    PORT: process.env.PORT,
    MONGODB_SRV: process.env.MONGODB_SRV,
    DATABASE: process.env.DATABASE,
    USER_PASSPORT_SECRET_KEY: process.env.USER_PASSPORT_SECRET_KEY,
}