var fs = require('fs'),
    dss = require('dss');

var fileContents = fs.readFileSync('modules/shared/style/components/_table.scss');

dss.parse(fileContents, {}, function (parsedObject) {
    console.log(parsedObject);
});