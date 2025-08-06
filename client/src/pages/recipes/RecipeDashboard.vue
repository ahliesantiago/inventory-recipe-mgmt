<script setup lang="ts">
import { ref } from 'vue'
import Dashboard from '@/layouts/Dashboard.vue'
import PageHeader from '@/components/common/PageHeader.vue'

const recipeView = ref<'cards' | 'list'>('cards')
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
  </Dashboard>
</template>
