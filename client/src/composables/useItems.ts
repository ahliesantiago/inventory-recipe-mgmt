import { ref } from 'vue'
import * as itemService from '@/services/itemService'
import type { ItemType } from '@/types/ItemTypes'

const items = ref<ItemType[]>([])
const ingredients = ref<ItemType[]>([])

export function useItems() {
  async function fetchItems() {
    const data = await itemService.getItems()
    items.value = data
  }

  async function fetchIngredients() {
    const data = await itemService.getIngredients()
    ingredients.value = data
  }

  return {
    items,
    ingredients,
    fetchItems,
    fetchIngredients
  }
}
