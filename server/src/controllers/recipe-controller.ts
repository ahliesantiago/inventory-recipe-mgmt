import { Request, Response } from 'express'
import * as RecipeModel from '../models/recipe-model'

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

export async function addRecipe(req: Request, res: Response) {
  try {
    const newRecipe = await RecipeModel.createRecipe(req.body)
    res.status(201).json(newRecipe)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recipe' })
  }
}
