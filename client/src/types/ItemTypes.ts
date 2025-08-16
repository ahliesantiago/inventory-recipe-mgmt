export interface ItemType {
  id: number
  item_name: string
  plural_name?: string
  is_ingredient: boolean
  is_food_equipment?: boolean
  created_at: Date
  updated_at: Date
}

export interface UnitType {
  id: number
  unit_name: string
  unit_plural_name?: string
  unit_acronym?: string
  unit_plural_acronym?: string
  created_at: Date
  updated_at: Date
}
