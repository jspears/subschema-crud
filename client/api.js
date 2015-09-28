"use strict";

var xhr = require("xhr")

function req(method, uri, json) {
    return new Promise(function (resolve, reject) {
        xhr({
            json,
            uri,
            method,
            responseType: 'json',
            headers: {
                "Content-Type": "application/json"
            }
        }, function (err, resp, body) {
            if (err) {
                return reject(err);
            }
            if (body.status === 0) {
                return resolve(body.payload);
            }
            reject(body.messages || body.error || body.payload);
        });
    });
}

var verbs = {
    post: req.bind(null, 'post'),
    get: req.bind(null, 'get'),
    put: req.bind(null, 'put'),
    delete: req.bind(null, 'delete')
}
module.exports = function (conf, model) {
    var {uri, idAttribute} = conf;
    uri = uri || '/rest';
    idAttribute = idAttribute || 'id';
    return {
        create: verbs.post.bind(null, uri + '/' + model),
        update: function (params) {
            return verbs.put.bind(null, uri + '/' + model + '/' + params[idAttribute]);
        },
        delete: function (params) {
            return verbs.delete.bind(null, uri + '/' + model + '/' + params[idAttribute]);
        },
        reuse: function (params) {
            return verbs.get.bind(null, uri + '/' + model);
        },
        verbs
    }
}