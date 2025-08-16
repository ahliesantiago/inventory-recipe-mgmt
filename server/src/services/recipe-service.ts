import db from '../db'
import { storeItem } from '../models/item-model'
import { storeRecipe } from '../models/recipe-model'
import { findUnitByName, storeUnit } from '../models/unit-model'
import { ItemIngredientInputType, RecipeIngredientsInputType, RecipeInputType, RecipeType } from '../types/recipe-types'
import { UnitInputType, UnitType } from '../types/item-types'
import { storeRecipeIngredients } from '../models/recipe-ingredients-model'

export async function createRecipeWithIngredients(recipeData: RecipeInputType, ingredients: ItemIngredientInputType[]) {
  return db.tx(async (t) => {
    // Create the recipe database entry
    let recipe
    try {
      recipe = await storeRecipe(recipeData, t)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      error.message = `Error storing the recipe: ${error.message}`
      console.error(error)
      throw error
    }

    for (const ingredient of ingredients) {
      const ingredientItem = {
        item_name: ingredient.ingredient,
        plural_name: ingredient.quantity > 1 ? ingredient.ingredient : undefined,
        is_ingredient: true,
        is_food_equipment: false,
      }

      // Check if the item already exists - if not, create it
      let item
      try {
        item = await storeItem(ingredientItem, t)
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        error.message = `Error finding or storing the item '${ingredient.ingredient}': ${error.message}`
        console.error(error)
        throw error
      }

      // Check if the unit already exists - if not, create it
      let checkUnit
      let unit: UnitType
      try {
        checkUnit = await findUnitByName(ingredient.unit, t)
        if (!checkUnit) {
          const newUnit: UnitInputType = {
            unit_name: ingredient.unit,
            unit_plural_name: ingredient.quantity > 1 ? ingredient.unit : undefined,
          }
          unit = await storeUnit(newUnit, t)
        } else {
          unit = checkUnit
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        error.message = `Error finding or storing the item '${ingredient.unit}': ${error.message}`
        console.error(error)
        throw error
      }

      const recipeIngredientDetails: RecipeIngredientsInputType = {
        recipe_id: recipe.id,
        item_id: item.id,
        quantity: ingredient.quantity,
        unit_id: unit.id,
      }

      // Create the recipe-ingredients entry
      try {
        await storeRecipeIngredients(recipeIngredientDetails, t)
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        error.message = `Error add the ingredient '${ingredient.ingredient}' to the recipe: ${error.message}`
        console.error(error)
        throw error
      }
    }

    return recipe
  })
}
