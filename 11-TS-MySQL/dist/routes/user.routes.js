"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/:id", [], user_controller_1.readUser);
router.get("/", [], user_controller_1.readUsers);
router.post("/", [], user_controller_1.crtUser);
router.put("/:id", [], user_controller_1.updUser);
router.delete("/:id", [], user_controller_1.delUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map