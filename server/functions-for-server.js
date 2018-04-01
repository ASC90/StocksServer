var https = require("https");
var functions = {
    reqest: asyncReq
}

// Request
function req(options) {
    let body = "";
    return new Promise(resolve => {
        https.get(options, function (res) {
            res.on("data", data => {
                body += data;
                
            });
            res.on("end", function(){
                resolve(body);
            });
        }) 
    });
}

async function asyncReq(options) {
    let resp = await req(options);
    return resp;
}

// Get all companies


exports.functions = functions;