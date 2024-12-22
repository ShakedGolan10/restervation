import express from 'express'
import { addTables } from './table.controller'
const router = express.Router()

router.post('/:restId', addTables)

export default router