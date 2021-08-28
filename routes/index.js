const express = require('express');
//const router=require('./routes')
const constants = require("../constants");
const routePrefix = `/birdEye/api/v${constants.apiVersion}`



module.exports = function(router) {
    router.use(`${routePrefix}`, require("./webScrappingRoutes"));
    router.use((err, req, res, next) => {
        err.method_name = req.url
        let { statusCode, message = 'internalServerError', errors = "" } = err;
        if (errors && errors.length && errors[0].type == "unique violation") {
            message = `${errors[0].path} is already used.`
            errors = ""
        }
        res.status(statusCode || 400).json({
            success: false,
            status: statusCode || 400,
            error: {
                err: errors,
                msg: message,
                stack: err.stack,
                errorCode: statusCode || 400
            },
            time: Date.now()
        });
    });
}