<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  inputClass?: string
  required?: boolean
  maxResults?: number
  items: T[]
  displayKey: keyof T
  searchKeys?: (keyof T)[]
  loading?: boolean
  displayFormatter?: (item: T) => string
}

const props = withDefaults(defineProps<Props>(), {
  inputClass: 'border border-gray-500 rounded p-2 w-full',
  required: false,
  maxResults: 10,
  searchKeys: () => [],
  loading: false,
  displayFormatter: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [item: T]
}>()

const showDropdown = ref(false)
const selectedIndex = ref(-1)

// Computed property for filtered items based on search term
const filteredItems = computed(() => {
  const searchTerm = props.modelValue?.toLowerCase() || ''
  if (!searchTerm) return []

  const keysToSearch = props.searchKeys.length > 0 ? props.searchKeys : [props.displayKey]

  return props.items
    .filter(item =>
      keysToSearch.some(key =>
        String(item[key]).toLowerCase().includes(searchTerm)
      )
    )
    .slice(0, props.maxResults)
})

// Helper function to get display text for an item
function getDisplayText(item: T): string {
  return props.displayFormatter ? props.displayFormatter(item) : String(item[props.displayKey])
}

// Handle input changes
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  showDropdown.value = value.length > 0
  selectedIndex.value = -1 // Reset selection when typing
}

// Handle keyboard navigation within the dropdown
function handleKeydown(event: KeyboardEvent) {
  if (!showDropdown.value || filteredItems.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredItems.value.length) {
        selectItem(filteredItems.value[selectedIndex.value])
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

// Select an item from the dropdown
function selectItem(item: T) {
  const displayValue = getDisplayText(item)
  emit('update:modelValue', displayValue)
  emit('select', item)
  showDropdown.value = false
  selectedIndex.value = -1 // Reset selection after choosing
}
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
      :aria-activedescendant="selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined"
    />

    <!-- Loading indicator -->
    <div
      v-if="loading"
      class="absolute right-2 top-1/2 transform -translate-y-1/2"
    >
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
    </div>

    <!-- Dropdown for suggestions -->
    <div
      v-if="showDropdown && filteredItems.length > 0"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1"
      role="listbox"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="item.id || index"
        :id="`search-option-${index}`"
        @mousedown="selectItem(item)"
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
        {{ getDisplayText(item) }}
      </div>
    </div>
  </div>
</template>
