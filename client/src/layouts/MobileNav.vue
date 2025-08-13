<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu } from 'lucide-vue-next'
import { navigationItems } from '@/lib/constants/navigation'

const route = useRoute()
const router = useRouter()
const isActive = (id: string) => {
  return computed(() => route.name === id).value
}

const mobileSidebarOpen = ref(false)

const toggleMobileSidebar = () => {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  mobileSidebarOpen.value = false
}
</script>

<template>
  <!-- Mobile Header -->
  <header class="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
    <button
      @click="toggleMobileSidebar"
      class="p-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      <Menu class="h-6 w-6" />
    </button>
    <h1 class="text-lg font-semibold text-gray-900" @click="router.push({ name: 'home' })">
      RHIGS
    </h1>
    <div class="w-10"></div> <!-- Spacer for centering -->
  </header>


  <!-- Mobile Sidebar Overlay -->
  <div
    v-if="mobileSidebarOpen"
    class="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
    @click="closeMobileSidebar"
  >
    <aside class="w-full h-full bg-white">
      <!-- Mobile Sidebar Header -->
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Recipe Manager</h2>
        <button
          @click="closeMobileSidebar"
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X class="h-6 w-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="item in navigationItems" :key="item.id">
            <router-link
              :to="{ name: item.id }"
              :class="[
                'w-full flex items-center p-4 rounded-md transition-colors text-left',
                isActive(item.id)
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <component :is="item.icon" class="h-6 w-6 flex-shrink-0" />
              <span class="ml-4 text-base font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>
