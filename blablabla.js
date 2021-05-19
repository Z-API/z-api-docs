

var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.z-api.io",
  "port": null,
  "path": "/instances/3978FA41D877D06208CEAAA52529D209/token/3978FA41D877D154F799AAA52529D209/send-text",
  "headers": {
      'Content-Type': 'application/json'
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({phone: '5544988313400', message: 'Welcome *Z-API*'}));
req.end();