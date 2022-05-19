if(process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const path = require('path');

    dotenv.config({
        path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
    });
}

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    PORT : process.env.PORT || 8080,
    HOST: process.env.HOST || 'localhost'
}