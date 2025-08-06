<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from 'lucide-vue-next'
import { navigationItems } from '@/lib/constants/navigation'

const route = useRoute()
const isActive = (id: string) => {
  return computed(() => route.name === id).value
}

const sidebarExpanded = ref(false)
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}
</script>

<template>
  <!-- Desktop Sidebar -->
  <aside
    :class="[
      'hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
      sidebarExpanded ? 'w-64' : 'w-20'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-gray-200">
      <button
        @click="toggleSidebar"
        class="w-full flex items-center justify-center lg:justify-start p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Menu class="h-6 w-6 text-gray-600" />
        <span v-if="sidebarExpanded" class="ml-3 text-lg font-semibold text-gray-900">
          Recipe Manager
        </span>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in navigationItems" :key="item.id">
          <router-link
            :to="{ name: item.id }"
            :class="[
              'w-full flex items-center p-3 rounded-md transition-colors',
              isActive(item.id)
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
            <span v-if="sidebarExpanded" class="ml-3 text-sm font-medium">
              {{ item.label }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>