"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Register
router.post('/register', auth_controller_1.register);
// Login
router.post('/login', auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map