<script setup lang="ts">
import { CupSoda, Popcorn, UtensilsCrossed } from 'lucide-vue-next'

const props = defineProps<{
  hasImage: boolean
  recipeImage?: string | null
  recipeName: string
  imgStyles?: string
  category?: Category,
  iconStyles?: string,
}>()

type Category = keyof typeof iconMap
const iconMap = {
  meal: UtensilsCrossed,
  beverages: CupSoda,
  snacks: Popcorn,
}

const Icon = iconMap[props.category ?? 'meal'] ?? UtensilsCrossed
</script>

<template>
  <img
    v-if="hasImage && recipeImage"
    :src="recipeImage"
    :alt="recipeName"
    class="w-full object-cover"
    :class="imgStyles ? imgStyles : 'h-full'"
  />
  <Icon
    v-if="!hasImage"
    class="w-full text-gray-400"
    :class="iconStyles ? iconStyles : 'h-full'"
  />
</template>
