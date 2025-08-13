import express from 'express'
import * as RecipeController from '../controllers/recipe-controller'

const router = express.Router()

router.get('/', RecipeController.getRecipes)
router.get('/:id', RecipeController.getRecipeById)
router.post('/', RecipeController.createRecipe)
router.put('/:id', RecipeController.editRecipe)
router.delete('/:id', RecipeController.deleteRecipe)

export default router
