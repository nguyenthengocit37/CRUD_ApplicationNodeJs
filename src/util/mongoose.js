module.exports = {
    mutipleMongooesToObjects: function(mutipleMongooes){
        return mutipleMongooes.map(mutipleMongooes => mutipleMongooes.toObject());
    },
    mongooseToObjects: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    },
}