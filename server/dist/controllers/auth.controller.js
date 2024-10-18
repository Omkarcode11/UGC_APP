"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.User.create({ name, email, passwordHash, role });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ message: "User registered successfully", user, token });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
        else
            res.status(500).json({ message: err });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password, role } = req.body;
    email = email.trim();
    password = password.trim();
    if (!email || !email.length)
        return res.status(400).json({ message: "Invalid mail" });
    const user = yield User_1.User.findOne({ email });
    if (!user) {
        return res
            .status(401)
            .json({ message: "User not found Please try again with different mail" });
    }
    if (!(yield bcrypt_1.default.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: "Incorrect Password" });
    }
    console.log(role, user.role);
    if (role != user.role)
        return res.status(400).json({ message: "Role is invalid" });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token });
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map