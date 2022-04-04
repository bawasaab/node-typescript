import { Router, Request } from "express";
import { config } from "dotenv";
config();

import { insertUser, updateUser, getUserById, deleteUser, getAllUser } from "../controllers/users";

const router = Router();

router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUser);
router.post('/', insertUser);

export default router;