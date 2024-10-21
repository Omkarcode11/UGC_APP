import { Router } from 'express';
import { User } from '../models/User';
import { login, register } from '../controllers/auth.controller';
import { validateUser } from '../middleware/validateUser';


const router = Router();

// Register
router.post('/register',validateUser, register);

// Login
router.post('/login', login);

export default router;
