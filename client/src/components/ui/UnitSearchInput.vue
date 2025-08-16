<script setup lang="ts">
import { onMounted } from 'vue'
import { useUnitsStore } from '@/stores/units'
import SearchInput from './SearchInput.vue'
import type { UnitType } from '@/types/ItemTypes'

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
  'select': [unit: UnitType]
}>()

const unitsStore = useUnitsStore()

function handleUpdateModelValue(value: string) {
  emit('update:modelValue', value)
}

function handleSelect(unit: UnitType) {
  emit('select', unit)
}

// Custom display formatter for units: "unit_name (unit_acronym)"
function formatUnitDisplay(unit: UnitType): string {
  const name = unit.unit_name
  const acronym = unit.unit_acronym
  return acronym ? `${name} (${acronym})` : name
}

onMounted(() => {
  // Fetch units for autocomplete if not already loaded
  if (unitsStore.units.length === 0) {
    unitsStore.fetchUnits()
  }
})
</script>

<template>
  <SearchInput
    :model-value="modelValue"
    @update:model-value="handleUpdateModelValue"
    @select="handleSelect"
    :items="unitsStore.units"
    display-key="unit_name"
    :display-formatter="formatUnitDisplay"
    :search-keys="['unit_name', 'unit_plural_name', 'unit_acronym', 'unit_plural_acronym']"
    :placeholder="placeholder"
    :input-class="inputClass"
    :required="required"
    :max-results="maxResults"
    :loading="unitsStore.isLoading"
  />
</template>
