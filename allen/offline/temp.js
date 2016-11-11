var readability = require('node-readability-cheerio');

readability.read('http://odds.500.com/fenxi/shuju-581388.shtml', function(err, $) {
    console.log($.html());
});