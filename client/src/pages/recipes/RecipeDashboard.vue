<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import Dashboard from '@/layouts/Dashboard.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import RecipeResults from '@/components/recipes/dashboard/RecipeResults.vue'
import type { Recipe } from '@/types/RecipeTypes'

const recipeView = ref<'cards' | 'list'>('cards')
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTotalTime = ref('')
const sortBy = ref('name')

const recipes = ref<Recipe[]>([])

const filteredRecipes = computed(() => {
  let filtered = recipes.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(recipe => {
      return recipe.recipe_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (recipe.description?.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(recipe => {
      return recipe.categories?.map(category => category.toLowerCase()).includes(selectedCategory.value.toLowerCase())
    })
  }

  // Total time filter
  if (selectedTotalTime.value) {
    filtered = filtered.filter(recipe => recipe.total_time <= parseInt(selectedTotalTime.value))
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.recipe_name.localeCompare(b.recipe_name)
      case 'totalTime':
        return a.total_time - b.total_time
      case 'rating':
        return (b.user_rating ?? 0) - (a.user_rating ?? 0)
      case 'dateAdded':
        return b.id - a.id
      default:
        return 0
    }
  })

  return filtered
})

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/recipes')
  if (res.ok) {
    recipes.value = await res.json()
  }
})
</script>

<template>
  <Dashboard>
    <template #header>
      <PageHeader
        title="Recipes"
        description="Manage and organize your recipe collection"
        :has-toggles="true"
        :view="recipeView"
        @update:view="recipeView = $event"
      />
    </template>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search recipes..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Prep & Cook Time</label>
          <select
            v-model="selectedTotalTime"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Time</option>
            <option value="15">Under 15 min</option>
            <option value="30">Under 30 min</option>
            <option value="60">Under 1 hour</option>
            <option value="120">Under 2 hours</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="total_time">Total Time</option>
            <option value="rating">Rating</option>
            <option value="dateAdded">Date Added</option>
          </select>
        </div>
      </div>
    </div>

    <RecipeResults
      :recipeCount="recipes.length"
      :recipeView="recipeView"
      :filteredRecipes="filteredRecipes"
    />
  </Dashboard>
</template>
