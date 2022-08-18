import {Router} from "express";
import {readUser, readUsers, crtUser, updUser, delUser} from '../controllers/user.controller';



const router = Router();


router.get("/:id", [

], readUser);

router.get("/", [

], readUsers);

router.post("/", [

], crtUser);

router.put("/:id", [

], updUser);

router.delete("/:id", [

], delUser);



export default router;