import { Request, Response } from 'express'
import * as RecipeModel from '../models/recipe-model'
import { createRecipeWithIngredients } from '../services/recipe-service'

export async function getRecipes(req: Request, res: Response) {
  try {
    const recipes = await RecipeModel.getAllRecipes()
    res.json(recipes)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' })
  }
}

export async function getRecipeById(req: Request, res: Response) {
  try {
    const recipe = await RecipeModel.getRecipeById(req.params.id)
    res.json(recipe)
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch recipe with ID ${req.params.id}` })
  }
}

export async function createRecipe(req: Request, res: Response) {
  const recipeData = {
    recipe_name: req.body.recipe_name,
    description: req.body.description,
    image: req.body.image,
    source: req.body.source,
    steps: req.body.steps,
    prep_time: req.body.prep_time,
    cook_time: req.body.cook_time,
    user_rating: req.body.user_rating
  }

  try {
    const newRecipe = await createRecipeWithIngredients(recipeData, req.body.ingredients)
    res.status(201).json(newRecipe)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recipe' })
  }
}

export async function editRecipe(req: Request, res: Response) {
  try {
    const updatedRecipe = await RecipeModel.updateRecipe(req.params.id, req.body)
    res.json(updatedRecipe)
  } catch (err) {
    res.status(500).json({ error: `Failed to update recipe with ID ${req.params.id}` })
  }
}

export async function deleteRecipe(req: Request, res: Response) {
  try {
    await RecipeModel.destroyRecipe(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: `Failed to delete recipe with ID ${req.params.id}` })
  }
}
