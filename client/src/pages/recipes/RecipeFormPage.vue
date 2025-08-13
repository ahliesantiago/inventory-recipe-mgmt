<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipes } from '@/composables/useRecipes'
import type { Recipe } from '@/types/RecipeTypes'

const { addRecipe, editRecipe, fetchRecipe, singleRecipe } = useRecipes()
const route = useRoute()
const router = useRouter()

const isEdit = route.name === 'recipe-edit'
const recipeId = route.params.id as string | undefined
const existingRecipe = singleRecipe.value

const now = new Date()

const formRef = ref<HTMLFormElement | null>(null)
const formData = reactive<Recipe>({
  id: existingRecipe ? existingRecipe.id : '',
  recipe_name: existingRecipe ? existingRecipe.recipe_name : '',
  description: existingRecipe ? existingRecipe.description : '',
  image: existingRecipe ? existingRecipe.image : '',
  source: existingRecipe ? existingRecipe.id : '',
  steps: existingRecipe ? existingRecipe.steps : [],
  prep_time: existingRecipe ? existingRecipe.prep_time : 0,
  cook_time: existingRecipe ? existingRecipe.cook_time : 0,
  total_time: existingRecipe ? existingRecipe.total_time : 0,
  user_rating: existingRecipe ? existingRecipe.user_rating : 0,
  categories: existingRecipe ? existingRecipe.categories : [],
  ingredients: existingRecipe ? existingRecipe.ingredients : [],
  created_at: existingRecipe ? existingRecipe.created_at : now,
  updated_at: existingRecipe ? existingRecipe.updated_at : now,
})

async function handleSubmit() {
  console.log('Form data being submitted:', formData)

  // if (isEdit) {
  //   await editRecipe(route.params.id as string, formData)
  // } else {
  //   await addRecipe(formData)
  // }

  // router.push({ name: 'recipes' })
}

onMounted(() => {
  if (isEdit && recipeId) {
    fetchRecipe(recipeId)
  }
})
</script>

<template>
  <main>
    <form action="/" method="POST" @submit.prevent="handleSubmit">

    </form>
  </main>
</template>
