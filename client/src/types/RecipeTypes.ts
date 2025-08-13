export interface Recipe {
  id: string
  recipe_name: string
  description?: string
  image?: string
  source?: string
  steps: string[]
  prep_time: number
  cook_time: number
  total_time: number // derived
  user_rating?: number
  categories?: string[] // derived
  ingredients: RecipeIngredients[] // derived
  created_at: Date
  updated_at: Date
}

export interface RecipeIngredients {
  ingredient: string
  unit: string
  unit_plural: string
  unit_acronym: string
  unit_plural_acronym: string
  qty: number
}
