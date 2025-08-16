<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Trash } from 'lucide-vue-next'
// @ts-ignore
import StarRating from 'vue-star-rating'
import { useRecipes } from '@/composables/useRecipes'
import type { RecipeInputType } from '@/types/RecipeTypes'

const { addRecipe, editRecipe, fetchRecipe, singleRecipe } = useRecipes()
const route = useRoute()
const router = useRouter()

const isEdit = route.name === 'recipe-edit' || !!route.params.id
const recipeId = route.params.id as string | undefined

const formData = ref<RecipeInputType>({
  recipe_name: '',
  description: null,
  image: null,
  source: null,
  steps: [],
  prep_time: '00:00:00',
  cook_time: '00:00:00',
  user_rating: 0,
  categories: [],
  ingredients: [{
    ingredient: '',
    unit: '',
    quantity: 0
  }],
})

// If editing, pre-fill form when initialData changes
watch(singleRecipe, (val) => {
  if (val && isEdit) {
    formData.value = {
      ...val,
      prep_time: String(val.prep_time) || '00:00:00',
      cook_time: String(val.cook_time) || '00:00:00',
    }
  }
}, { immediate: true })

async function handleSubmit() {
  const jsonFormData = toRaw(formData.value)

  if (isEdit) {
    // await editRecipe(route.params.id as string, jsonFormData)
  } else {
    await addRecipe(jsonFormData)
  }

  router.push({ name: 'recipes' })
}

onMounted(() => {
  if (isEdit && recipeId) {
    fetchRecipe(recipeId)
  }
})
</script>

<template>
  <section>
    <header class="bg-blue-50 border-b border-blue-200 p-4 lg:p-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col items-start justify-between space-y-2">
          <h1 class="font-bold text-gray-900 text-3xl lg:text-4xl">
            {{ singleRecipe ? singleRecipe.recipe_name : 'Create Recipe' }}
          </h1>
          <button
            @click="router.push({
              name: singleRecipe ? 'recipe-view' : 'recipes',
              params: singleRecipe ? { id: singleRecipe.id } : undefined
            })"
            class="text-blue-500 hover:text-blue-700 text-sm lg:text-xs cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </div>
    </header>

    <form @submit.prevent="handleSubmit" class="p-5 space-y-4">
      <div>
        <label for="recipe_name" class="block font-medium">Recipe Name</label>
        <input
          id="recipe_name"
          v-model="formData.recipe_name"
          type="text"
          class="border border-gray-500 rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label for="description" class="block font-medium">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          class="border border-gray-500 rounded p-2 w-full"
          rows="5"
        ></textarea>
      </div>

      <div>
        <label for="source" class="block font-medium">Source (optional)</label>
        <input
          id="source"
          v-model="formData.source"
          type="text"
          class="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <label for="steps" class="block font-medium">Ingredients</label>
        <div class="grid grid-cols-4 sm:grid-cols-8 gap-4 items-center mb-2">
          <h5 class="col-span-1 sm:col-span-2 text-center">Ingredient</h5>
          <h5 class="text-center">Quantity</h5>
          <h5 class="text-center">Unit</h5>
        </div>
        <div class="grid grid-cols-4 sm:grid-cols-8 gap-4 space-y-2 items-center" v-for="(ingredient, index) in formData.ingredients" :key="index">
          <input
            type="text"
            v-model="ingredient.ingredient"
            class="col-span-1 sm:col-span-2 border border-gray-500 rounded p-2 w-full"
            required
          />
          <input
            type="number"
            v-model.number="ingredient.quantity"
            class="col-span-1 border border-gray-500 rounded p-2 w-full"
            required
          />
          <input
            type="text"
            v-model="ingredient.unit"
            class="col-span-1 border border-gray-500 rounded p-2 w-full"
            required
          />
          <div class="flex space-x-2">
            <button
              type="button"
              @click="formData.ingredients?.splice(index, 1)"
              class="bg-red-500 text-white p-2 rounded"
            >
              <Trash class="w-4 h-4" />
            </button>
          </div>
        </div>
        <button
          type="button"
          class="bg-blue-500 text-white p-2 rounded"
          @click="formData.ingredients?.push({ ingredient: '', unit: '', quantity: 0 })"
        >
          Add Ingredient
        </button>
      </div>

      <div>
        <label for="steps" class="block font-medium">Steps</label>
        <textarea
          id="steps"
          v-model="formData.steps"
          class="border border-gray-500 rounded p-2 w-full"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="prep_time" class="block font-medium">Prep Time (hh:mm)</label>
          <input
            id="prep_time"
            v-model="formData.prep_time"
            type="time"
            step="1"
            class="border border-gray-500 rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label for="cook_time" class="block font-medium">Cook Time (hh:mm)</label>
          <input
            id="cook_time"
            v-model="formData.cook_time"
            type="time"
            step="1"
            class="border border-gray-500 rounded p-2 w-full"
            required
          />
        </div>
      </div>

      <div class="flex flex-col space-y-1">
        <label for="user_rating" class="block font-medium">User Rating ({{ formData.user_rating }}/5)</label>
        <StarRating
          :increment="0.25"
          :star-size="23"
          id="user_rating"
          v-model:rating="formData.user_rating"
          :show-rating="false"
        />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ isEdit ? 'Update Recipe' : 'Add Recipe' }}
      </button>
    </form>
  </section>
</template>
