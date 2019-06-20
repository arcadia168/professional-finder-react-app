 // server/routes.js
 var fs = require('fs');
 var path = require('path');

 module.exports = function (app) {
     // server routes ===========================================================
     app.get('/api/categories', function (req, res) {
         var pathName = path.resolve(__dirname, `./data/profession-categories.json`);
         var professionCategories = JSON.parse(fs.readFileSync(pathName, 'utf8'));
         res.json(professionCategories);
     });
 };
