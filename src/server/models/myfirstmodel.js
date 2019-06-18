// server/models/book.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our book model
// module.exports allows us to pass this to other files when it is called
var myExampleSchema = new mongoose.Schema({
    someSchemaValue: String,
    // formats: {
    //     pdf: {
    //         url: String
    //     },
    //     epub: {
    //         url: String
    //     },
    //     text: {
    //         url: String
    //     }
    // },
    // preview_url: String,
    // read_url: String,
    // availability: String
})

module.exports = mongoose.model('MyFirstModel', myExampleSchema);
