export interface Recipe {
  id: string
  recipe_name: string
  description: string | null
  image: string | null
  source: string | null
  steps: string[]
  prep_time: number
  cook_time: number
  total_time: number // derived
  user_rating: number
  categories: string[] // derived
  ingredients: RecipeIngredients[] // derived
  created_at: Date
  updated_at: Date
}

export interface RecipeInputType {
  recipe_name: string
  description: string | null
  image: string | null
  source: string | null
  steps: string[]
  prep_time: string
  cook_time: string
  user_rating: number
  categories: string[] | null
  ingredients: RecipeIngredients[]
}

export interface RecipeIngredients {
  ingredient: string
  unit: string
  unit_plural?: string
  unit_acronym?: string
  unit_plural_acronym?: string
  quantity: number
}
