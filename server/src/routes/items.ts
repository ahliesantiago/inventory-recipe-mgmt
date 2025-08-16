import express from 'express'
import * as ItemController from '../controllers/item-controller'
import * as UnitController from '../controllers/unit-controller'

const router = express.Router()

router.get('/', ItemController.getItems)
router.get('/ingredients', ItemController.getItemIngredients)
router.get('/units', UnitController.getUnits)

export default router
