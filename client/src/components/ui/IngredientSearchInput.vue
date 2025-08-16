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
const selectedIndex = ref(-1)

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
  selectedIndex.value = -1 // Reset selection when typing
}

// Handle keyboard navigation within the dropdown
function handleKeydown(event: KeyboardEvent) {
  if (!showDropdown.value || filteredIngredients.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredIngredients.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredIngredients.value.length) {
        selectIngredient(filteredIngredients.value[selectedIndex.value].item_name)
      }
      break
    case 'Escape':
      event.preventDefault()
      showDropdown.value = false
      selectedIndex.value = -1
      break
  }
}

// Show dropdown upon focus if there's a value
function handleFocus() {
  if (props.modelValue) {
    showDropdown.value = true
  }
}

// Hide dropdown and reset selection when clicking out of input
function handleBlur() {
  // Delay closing to allow click events on dropdown items to fire
  setTimeout(() => {
    showDropdown.value = false
    selectedIndex.value = -1
  }, 150)
}

// Select an ingredient from the dropdown
function selectIngredient(ingredientName: string) {
  emit('update:modelValue', ingredientName)
  showDropdown.value = false
  selectedIndex.value = -1 // Reset selection after choosing
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
      @keydown="handleKeydown"
      @blur="handleBlur"
      @focus="handleFocus"
      :placeholder="placeholder"
      :class="inputClass"
      :required="required"
      role="combobox"
      :aria-expanded="showDropdown"
      aria-autocomplete="list"
      :aria-activedescendant="selectedIndex >= 0 ? `ingredient-option-${selectedIndex}` : undefined"
    />

    <!-- Dropdown for ingredient suggestions -->
    <div
      v-if="showDropdown && filteredIngredients.length > 0"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1"
      role="listbox"
    >
      <div
        v-for="(ingredient, index) in filteredIngredients"
        :key="ingredient.id"
        :id="`ingredient-option-${index}`"
        @mousedown="selectIngredient(ingredient.item_name)"
        @mouseenter="selectedIndex = index"
        :class="[
          'px-3 py-2 cursor-pointer text-sm border-b border-gray-100 last:border-b-0',
          selectedIndex === index
            ? 'bg-blue-100 text-blue-900'
            : 'hover:bg-blue-50'
        ]"
        role="option"
        :aria-selected="selectedIndex === index"
      >
        {{ ingredient.item_name }}
      </div>
    </div>
  </div>
</template>
