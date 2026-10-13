import 'dotenv/config';

const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JSON_WEB_TOKEN_SECRET: process.env.JSON_WEB_TOKEN_SECRET,
}

export default env;