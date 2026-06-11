"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => async (req, res, next) => {
    await schema.parseAsync({
        body: req.body,
    });
    next();
};
exports.default = validateRequest;
