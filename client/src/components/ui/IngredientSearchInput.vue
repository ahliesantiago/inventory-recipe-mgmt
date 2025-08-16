<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useIngredientsStore } from '@/stores/ingredients'

interface Props {
  modelValue: string
  placeholder?: string
  inputClass?: string
  required?: boolean
  maxResults?: number
}

const props = withDefaults(defineProps<Props>(), {
  inputClass: 'border border-gray-500 rounded p-2 w-full',
  required: false,
  maxResults: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const ingredientsStore = useIngredientsStore()
const showDropdown = ref(false)

// Computed property for filtered ingredients based on search term
const filteredIngredients = computed(() => {
  const searchTerm = props.modelValue?.toLowerCase() || ''
  if (!searchTerm) return []

  return ingredientsStore.ingredients
    .filter(ingredient => ingredient.item_name.toLowerCase().includes(searchTerm))
    .slice(0, props.maxResults)
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  showDropdown.value = value.length > 0
}

function handleFocus() {
  if (props.modelValue) {
    showDropdown.value = true
  }
}

function handleBlur() {
  // Delay closing to allow click events on dropdown items to fire
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

function selectIngredient(ingredientName: string) {
  emit('update:modelValue', ingredientName)
  showDropdown.value = false
}

onMounted(() => {
  // Fetch ingredients for autocomplete if not already loaded
  if (ingredientsStore.ingredients.length === 0) {
    ingredientsStore.fetchIngredients()
  }
})
</script>

<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :placeholder="placeholder"
      :class="inputClass"
      :required="required"
    />

    <!-- Dropdown for ingredient suggestions -->
    <div
      v-if="showDropdown && filteredIngredients.length > 0"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1"
    >
      <div
        v-for="ingredient in filteredIngredients"
        :key="ingredient.id"
        @mousedown="selectIngredient(ingredient.item_name)"
        class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
      >
        {{ ingredient.item_name }}
      </div>
    </div>
  </div>
</template>
