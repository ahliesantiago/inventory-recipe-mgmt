<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h3 class="text-2xl md:text-xl font-semibold text-gray-900">
    {{ title }}
  </h3>
</template>
