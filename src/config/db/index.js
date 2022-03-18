const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/khung_stream');
        console.log('Connect Susscesfully !!');
    } catch (error) {
        console.log('Connect Error !!');
    }
}
module.exports ={connect};