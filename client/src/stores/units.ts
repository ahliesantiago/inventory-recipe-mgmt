import { defineStore } from 'pinia'
import { getUnits } from '@/services/itemService'
import type { UnitType } from '@/types/ItemTypes'

export const useUnitsStore = defineStore('units', {
  state: () => ({
    units: [] as UnitType[],
    isLoading: false,
    error: null as string | null,
    lastFetched: null as Date | null
  }),

  getters: {

  },

  actions: {
    async fetchUnits() {
      this.isLoading = true
      this.error = null

      try {
        const data = await getUnits()
        this.units = data
        this.lastFetched = new Date()
      } catch (err: any) {
        this.error = err?.message || 'Failed to fetch units'
      } finally {
        this.isLoading = false
      }
    },
  },
})
