export interface Recipe {
  id: number
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
  ingredients: string[] // derived
  created_at: Date
  updated_at: Date
}
