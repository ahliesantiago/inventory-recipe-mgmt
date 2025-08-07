export interface Recipe {
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
