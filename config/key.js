require('dotenv').config();

module.exports = {
    MongoURI: process.env.MEDICOMAPPDBURL,
    //NODE_ENV:'development'
    NODE_ENV:'production' 
};
