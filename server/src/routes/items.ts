import express from 'express'
import * as ItemController from '../controllers/item-controller'

const router = express.Router()

router.get('/', ItemController.getItems)
router.get('/ingredients', ItemController.getItemIngredients)

export default router
