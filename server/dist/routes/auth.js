"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateUser_1 = require("../middleware/validateUser");
const router = (0, express_1.Router)();
// Register
router.post('/register', validateUser_1.validateUser, auth_controller_1.register);
// Login
router.post('/login', auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map