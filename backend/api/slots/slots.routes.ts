import express from 'express';
import { getAllSlots } from './slots.controller';
const router = express.Router();

router.get('/:restId', getAllSlots);

export default router;
