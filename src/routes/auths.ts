import { Router } from "express";
import { logIn, decodeToken } from "../controllers/auths";

const router = Router();

router.post('/login', logIn);
router.post('/decodeToken', decodeToken);

export default router;