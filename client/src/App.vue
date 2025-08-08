<script setup lang="ts">
import MobileNav from './layouts/MobileNav.vue'
import SideBar from './layouts/SideBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <MobileNav />

    <div class="flex">
      <SideBar />

      <router-view />
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
