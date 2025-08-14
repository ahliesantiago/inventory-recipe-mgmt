<script setup lang="ts">
import { navigationItems } from '@/lib/constants/navigation'
</script>

<template>
  <section class="flex-1 min-h-screen">
    <div class="p-6 lg:p-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Welcome to RHIGS
            <span class="text-sm align-top">
              LI
            </span>
          </h1>
          <h2 class="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
            Your all-in-one kitchen and home inventory tool
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your recipes, manage your inventory, and plan your grocery shopping all in one place.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            :to="{ name: item.id }"
            v-for="item in navigationItems.slice(1)"
            :key="item.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <component :is="item.icon" class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ item.label }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>