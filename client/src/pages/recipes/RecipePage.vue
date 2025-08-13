<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ExternalLink, Maximize2, Minimize2, Edit, ShoppingBasket, Star, Trash2, X } from 'lucide-vue-next'
import { useRecipes } from '@/composables/useRecipes'
import Dashboard from '@/layouts/Dashboard.vue'
import RecipeImage from '@/components/recipes/details/RecipeImage.vue'
import RecipeSectionHeader from '@/components/ui/recipe-page/RecipeSectionHeader.vue'

const route = useRoute()
const router = useRouter()
const { deleteRecipe, fetchRecipe, singleRecipe } = useRecipes()

const loading = ref(true)
const error = ref<string | null>(null)

const loadRecipe = async () => {
  try {
    loading.value = true
    error.value = null

    await fetchRecipe(route.params.id as string)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load recipe'
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!singleRecipe.value) return

  if (confirm('Are you sure you want to delete this recipe?')) {
    await deleteRecipe(singleRecipe.value.id)
    router.push({ name: 'recipes' })
  }
}

const handleEdit = () => {
  if (!singleRecipe.value) return
  router.push({ name: 'recipe-edit', params: { id: singleRecipe.value.id } })
}

onMounted(() => {
  loadRecipe()
})
</script>

<template>
  <Dashboard>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
      <div class="text-gray-500">Loading recipe...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div class="text-red-600 mb-4">{{ error }}</div>
        <button
          @click="router.push({ name: 'recipes' })"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Back to Recipes
        </button>
      </div>
    </div>

    <!-- Recipe Content -->
    <div v-else-if="singleRecipe" class="max-w-6xl mx-auto">
      <!-- Recipe Header -->
      <!-- TODO: extend horizontally and become sticky when scrolling -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 space-y-4">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">{{ singleRecipe.recipe_name }}</h1>
        <button
          @click="router.push({ name: 'recipes' })"
          class="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
        >
          ← Back to Recipes
        </button>
      </div>

      <!-- Recipe Body -->
      <div class="space-y-6">
        <!-- Recipe Image and Basic Info -->
        <div class="grid lg:grid-cols-2 gap-6">
          <div>
            <RecipeImage
              :hasImage="!!singleRecipe.image"
              :recipeImage="singleRecipe.image"
              :recipeName="singleRecipe.recipe_name"
              imgStyles="aspect-video rounded-lg"
              iconStyles="h-75 border border-gray-200 rounded-lg"
            />
          </div>

          <!-- Side Details -->
          <div class="flex flex-col gap-6">
            <!-- Metrics -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Prep Time</div>
                <div class="text-lg font-semibold">{{ singleRecipe.prep_time }} mins</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Cook Time</div>
                <div class="text-lg font-semibold">{{ singleRecipe.cook_time }} mins</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Total Time</div>
                <div class="text-lg font-semibold">{{ singleRecipe.total_time }} mins</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Rating</div>
                <div class="text-lg font-semibold flex items-center">
                  <Star class="h-5 w-5 text-yellow-400 mr-1" />
                  {{ singleRecipe.user_rating }}
                </div>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-4 justify-between items-center md:items-start">
              <!-- Categories -->
              <div v-if="(singleRecipe.categories?.length ?? 0) > 0" class="flex flex-wrap gap-2">
                <span
                  v-for="category in singleRecipe.categories"
                  :key="category"
                  class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ category }}
                </span>
              </div>

              <!-- Actions -->
              <div class="flex space-x-2">
                <button
                  @click="handleEdit"
                  class="px-3 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-200 rounded-md border border-blue-200 transition-colors flex items-center gap-2"
                >
                  <Edit class="h-4 w-4" />
                  Edit
                </button>
                <button
                  @click="handleDelete"
                  class="px-3 py-2 text-sm bg-red-50 text-red-700 hover:bg-red-200 rounded-md border border-red-200 transition-colors flex items-center gap-2"
                >
                  <Trash2 class="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>

            <!-- History -->
            <div class="place-self-end">
              <p class="text-xs text-gray-600">
                <!-- Last prepared on: MMMM D, YYYY (dddd) -->
              </p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div v-if="singleRecipe.description" class="bg-gray-100 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p class="text-gray-700 whitespace-pre-line">{{ singleRecipe.description }}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-x-4 px-2">
          <!-- Ingredients -->
          <div class="flex-1">
            <div class="min-h-[2.5rem] flex items-center justify-between mb-4 flex-wrap md:flex-nowrap gap-2">
              <RecipeSectionHeader title="Ingredients" />
              <button
                class="p-2 md:px-4 bg-[#3c6e71] text-white rounded-md hover:bg-[#284b63] transition-colors text-sm flex items-center gap-2"
              >
                <ShoppingBasket class="h-5 w-5 inline-block" />
                <span class="block sm:hidden md:block">Add to Grocery List</span>
              </button>
            </div>
            <ul class="space-y-2 ps-2">
              <span v-if="singleRecipe.ingredients.length === 0" class="text-gray-500 italic">
                Add ingredients to this recipe.
              </span>
              <li
                v-for="ingredient in singleRecipe.ingredients"
                :key="ingredient.ingredient"
                class="flex items-center text-gray-700 text-sm"
              >
                <div class="w-[6px] h-[6px] bg-blue-400 mr-3"></div>
                {{ ingredient.ingredient }} - {{ ingredient.qty }}{{ ingredient.qty > 1 ? ingredient.unit_plural_acronym : ingredient.unit_acronym }}
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div class="flex-1 xl:flex-2">
            <div class="min-h-[2.5rem] flex items-center justify-between mb-4">
              <RecipeSectionHeader title="Instructions" />
            </div>
            <div class="space-y-4">
              <div v-if="!singleRecipe.steps || singleRecipe.steps.length === 0" class="text-gray-500 italic">
                Add steps to this recipe.
              </div>
              <div
                v-for="(step, index) in singleRecipe.steps"
                :key="index + 1"
                class="flex"
              >
                <div class="flex-shrink-0 w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                  {{ index + 1 }}
                </div>
                <p class="text-gray-700 pt-1">{{ step }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Source -->
        <div v-if="singleRecipe.source" class="mt-4">
          <RecipeSectionHeader title="Source" class="mb-4" />
          <a
            :href="singleRecipe.source"
            target="_blank"
            class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <ExternalLink class="h-4 w-4 mr-2" />
            {{ singleRecipe.source }}
          </a>
        </div>
      </div>
    </div>
  </Dashboard>
</template>
