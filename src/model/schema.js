module.exports = function(){
    var db = require('../libs/db-connection')();
    var Schema = require('mongoose').Schema;

    var schema = Schema({
        title: { 
            type: String,
            unique: true
        },
        description: String,
        created_at: String,
        completed_at:String,
        status: Boolean,
    });
    return db.model('schema', schema);
}
