<script setup lang="ts">
import MobileNav from './layouts/MobileNav.vue'
import SideBar from './layouts/SideBar.vue'
</script>

<template>
  <div class="app-container">
    <div class="mobile-header-area lg:hidden">
      <MobileNav />
    </div>

    <div class="desktop-sidebar-area hidden lg:block">
      <SideBar />
    </div>

    <main class="main-content-area">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
:root {
  --sidebar-width: 80px; /* Default collapsed width */
  --mobile-header-height: 60px; /* Mobile header height */
}

.app-container {
  min-height: 100vh;
  background-color: rgb(249 250 251); /* bg-gray-50 */

  /* Mobile layout: Stack header and content with proper scrolling */
  display: flex;
  flex-direction: column;
}

.mobile-header-area {
  flex-shrink: 0; /* Prevent header from shrinking */
  position: sticky;
  top: 0;
  z-index: 50;
}

.main-content-area {
  flex: 1;
  overflow: auto;
}

/* Desktop layout: Grid with sidebar on left, content on right */
@media (min-width: 1024px) {
  .app-container {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "sidebar content";
  }

  .mobile-header-area {
    display: none; /* Hide mobile header on desktop */
  }

  .desktop-sidebar-area {
    grid-area: sidebar;
  }

  .main-content-area {
    grid-area: content;
    overflow: auto;
  }
}

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
