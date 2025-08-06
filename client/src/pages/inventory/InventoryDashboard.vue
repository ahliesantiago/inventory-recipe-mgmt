<script setup lang="ts">
import Dashboard from '@/layouts/Dashboard.vue'
import PageHeader from '@/components/common/PageHeader.vue'
</script>

<template>
  <Dashboard>
    <template #header>
      <PageHeader
        title="Inventory"
        description="Manage your home inventory, from pantry ingredients and kitchen equipment to household items, appliances, wardrobe pieces, and more."
      />
    </template>
  </Dashboard>
</template>
