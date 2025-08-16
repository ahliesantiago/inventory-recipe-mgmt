import { defineStore } from 'pinia'
import { getIngredients } from '@/services/itemService'
import type { ItemType } from '@/types/ItemTypes'

export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    ingredients: [] as ItemType[],
    isLoading: false,
    error: null as string | null,
    lastFetched: null as Date | null
  }),

  getters: {

  },

  actions: {
    async fetchIngredients() {
      this.isLoading = true
      this.error = null

      try {
        const data = await getIngredients()
        this.ingredients = data
        this.lastFetched = new Date()
      } catch (err: any) {
        this.error = err?.message || 'Failed to fetch ingredients'
      } finally {
        this.isLoading = false
      }
    },
  },
})
