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
exports.delUser = exports.updUser = exports.crtUser = exports.readUsers = exports.readUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findByPk(id);
    const userStatus = user === null || user === void 0 ? void 0 : user.getDataValue("status");
    if (user && userStatus) {
        res.status(200).json({
            msg: "GET User",
            user
        });
    }
    else {
        res.status(400).json({
            msg: "El usuario con el id especificado no existe"
        });
    }
});
exports.readUser = readUser;
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findAll();
    res.status(200).json({
        msg: "GET Users",
        users
    });
});
exports.readUsers = readUsers;
const crtUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const existEmail = yield user_model_1.default.findOne({
            where: {
                email
            }
        });
        if (!existEmail) {
            const user = user_model_1.default.build({ name, email });
            yield user.save();
            res.status(200).json({
                msg: "POST User",
                user
            });
        }
        else {
            return res.status(400).json({
                msg: "Este correo ya está registrado en la base de datos"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Algo salió mal"
        });
    }
});
exports.crtUser = crtUser;
const updUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        let existEmail;
        if (email) {
            existEmail = yield user_model_1.default.findOne({
                where: {
                    email
                }
            });
        }
        if (!existEmail) {
            const user = yield user_model_1.default.findByPk(id);
            const userStatus = user === null || user === void 0 ? void 0 : user.getDataValue("status");
            if (!user || !userStatus) {
                return res.status(404).json({
                    msg: "No existe el usuario con el id especificado"
                });
            }
            yield user.update({ name, email });
            res.status(200).json({
                msg: "PUT User",
                id,
                user
            });
        }
        else {
            return res.status(400).json({
                msg: "El correo que está intentando modificar ya existe en la base de datos"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Algo salió mal"
        });
    }
});
exports.updUser = updUser;
const delUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findByPk(id);
        const userStatus = user === null || user === void 0 ? void 0 : user.getDataValue("status");
        if (user && userStatus) {
            yield user.update({
                status: false
            });
            res.status(200).json({
                msg: "DELETE User",
                id,
                user
            });
        }
        else {
            res.status(400).json({
                msg: "El usuario con el id especificado no existe"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Algo salió mal"
        });
    }
});
exports.delUser = delUser;
//# sourceMappingURL=user.controller.js.map