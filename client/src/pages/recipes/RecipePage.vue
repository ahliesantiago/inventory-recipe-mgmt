<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { ExternalLink, Maximize2, Minimize2, ShoppingBasket, Star, X } from 'lucide-vue-next'
import { useRecipes } from '@/composables/useRecipes'
import RecipeImage from '@/components/recipes/details/RecipeImage.vue'
import RecipeSectionHeader from '@/components/ui/recipe-page/RecipeSectionHeader.vue'
import type { Recipe } from '@/types/RecipeTypes'

const props = defineProps<{
  closeRecipe: () => void
  selectedRecipe: Recipe | null
}>()

defineEmits<{
  (event: 'update:view', view: 'cards' | 'list'): void
}>()

type ViewMode = 'modal' | 'fullscreen'

const view = ref<ViewMode>('fullscreen')

const { deleteRecipe } = useRecipes()

const containerClasses = computed(() => ({
  'recipe-modal-overlay': view.value === 'modal',
  'recipe-fullscreen-page': view.value === 'fullscreen'
}))

const toggleView = () => {
  view.value = view.value === 'modal' ? 'fullscreen' : 'modal'
}

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      props.closeRecipe()
      break
    case 'f':
      toggleView()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* preserves \n but still wraps text */
.description {
  white-space: pre-line;
}

.recipe-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.recipe-fullscreen-page {
  width: 100%;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  background-color: white;
}
</style>

<template>
  <div
    v-if="selectedRecipe"
    :class="containerClasses"
    @click="view === 'modal' ? closeRecipe() : null"
  >
    <div
      :class="[
        'overflow-y-auto',
        view === 'modal' ? 'bg-white rounded-lg max-w-4xl w-full max-h-[90vh]' : ''
      ]"
      @click.stop
    >
      <!-- Recipe Header -->
      <div class="sticky top-0 bg-blue-50 border-b border-gray-200 p-6 flex items-center justify-between gap-2">
        <h2 class="text-4xl md:text-3xl font-bold text-gray-900">{{ selectedRecipe.recipe_name }}</h2>
        <div class="flex items-center space-x-2">
          <button
            @click="$router.push({ name: 'recipe-edit', params: { id: selectedRecipe.id } })"
            class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            @click="deleteRecipe(selectedRecipe.id)"
            class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
          <button
            @click="toggleView"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
            :title="view === 'modal' ? 'Switch to fullscreen (Cmd/Ctrl+F)' : 'Switch to modal'"
          >
            <Maximize2 v-if="view === 'modal'" class="h-7 w-7 md:h-5 md:w-5 text-gray-600" />
            <Minimize2 v-else class="h-7 w-7 md:h-5 md:w-5 text-gray-600" />
          </button>
          <button
            @click="closeRecipe"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X class="h-7 w-7 md:h-5 md:w-5" />
          </button>
        </div>
      </div>

      <!-- Recipe Body -->
      <div :class="['bg-[#e7ecef] p-6 flex flex-col gap-6', view == 'fullscreen' ? 'py-10' : '']">
        <!-- Recipe Image and Basic Info -->
        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <RecipeImage
              :hasImage="!!selectedRecipe.image"
              :recipeImage="selectedRecipe.image"
              :recipeName="selectedRecipe.recipe_name"
              imgStyles="aspect-video rounded-lg"
              iconStyles="h-75 border border-gray-300"
            />
          </div>

          <!-- Side Details -->
          <div class="flex flex-col gap-6">
            <!-- Metrics -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Prep Time</div>
                <div class="text-lg font-semibold">{{ selectedRecipe.prep_time }} mins</div>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Cook Time</div>
                <div class="text-lg font-semibold">{{ selectedRecipe.cook_time }} mins</div>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Total Time</div>
                <div class="text-lg font-semibold">{{ selectedRecipe.total_time }} mins</div>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-sm text-gray-600">Rating</div>
                <div class="text-lg font-semibold flex items-center">
                  <Star class="h-5 w-5 text-yellow-400 mr-1" />
                  {{ selectedRecipe.user_rating }}
                </div>
              </div>
            </div>

            <!-- Categories -->
            <div v-if="(selectedRecipe.categories?.length ?? 0) > 0" class="flex flex-wrap gap-2">
              <span
                v-for="category in selectedRecipe.categories"
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base md:text-sm font-medium"
              >
                {{ category }}
              </span>
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
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-gray-700 description">{{ selectedRecipe.description }}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-x-4">
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
              <span v-if="selectedRecipe.ingredients.length === 0" class="text-gray-500 italic">
                Add ingredients to this recipe.
              </span>
              <li
                v-for="ingredient in selectedRecipe.ingredients"
                :key="ingredient.ingredient"
                class="flex items-center text-gray-700 text-sm"
              >
                <div class="w-[6px] h-[6px] bg-blue-400 mr-3"></div>
                {{ ingredient.ingredient }} - {{ ingredient.qty }}{{ ingredient.qty > 1 ? ingredient.unit_plural_acronym : ingredient.unit_acronym }}
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div :class="['flex-1', view === 'fullscreen' ? 'lg:flex-2' : '']">
            <div class="min-h-[2.5rem] flex items-center justify-between mb-4">
              <RecipeSectionHeader title="Instructions" />
            </div>
            <div class="space-y-4">
              <div v-if="!selectedRecipe.steps || selectedRecipe.steps.length === 0" class="text-gray-500 italic">
                Add steps to this recipe.
              </div>
              <div
                v-for="(step, index) in selectedRecipe.steps"
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
        <div v-if="selectedRecipe.source" class="mt-4">
          <RecipeSectionHeader title="Source(s)" class="mb-4" />
          <div class="bg-gray-50 rounded-lg p-4">
            <a
              :href="selectedRecipe.source"
              target="_blank"
              class="text-blue-500 hover:text-blue-800 text-sm flex items-center cursor-pointer"
            >
              <ExternalLink class="h-4 w-4 mr-1" />
              {{ selectedRecipe.source }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
