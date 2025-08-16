export interface RecipeType {
  id: number
  recipe_name: string
  description?: string
  image?: string
  source?: string
  steps: string[]
  prep_time: number
  cook_time: number
  user_rating?: number
  created_at: Date
  updated_at: Date
}

export interface RecipeInputType extends Omit<RecipeType, 'id' | 'created_at' | 'updated_at'> {}

export interface RecipeIngredientsType {
  recipe_id: number
  item_id: number
  quantity: number
  unit_id: number
  created_at: Date
  updated_at: Date
}

export interface RecipeIngredientsInputType extends Omit<RecipeIngredientsType, 'created_at' | 'updated_at'> {}

export interface ItemIngredientInputType {
  ingredient: string
  unit: string
  unit_plural?: string
  unit_acronym?: string
  unit_plural_acronym?: string
  quantity: number
}
