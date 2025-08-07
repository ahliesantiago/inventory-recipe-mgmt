import express from 'express'
import * as RecipeController from '../controllers/recipe-controller'

const router = express.Router()

router.get('/', RecipeController.getRecipes)
router.get('/:id', RecipeController.getRecipeById)

export default router
