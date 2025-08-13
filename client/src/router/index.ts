import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import InventoryDashboard from '@/pages/inventory/InventoryDashboard.vue'
import ItemDashboard from '@/pages/items/ItemDashboard.vue'
import ListDashboard from '@/pages/lists/ListDashboard.vue'
import RecipeDashboard from '@/pages/recipes/RecipeDashboard.vue'
import RecipeFormPage from '@/pages/recipes/RecipeFormPage.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/inventory', name: 'inventory', component: InventoryDashboard },
  { path: '/items', name: 'items', component: ItemDashboard },
  { path: '/lists', name: 'lists', component: ListDashboard },
  { path: '/recipes', name: 'recipes', component: RecipeDashboard },

  { path: '/recipes/add', name: 'recipe-add', component: RecipeFormPage },
  { path: '/recipes/:id/edit', name: 'recipe-edit', component: RecipeFormPage }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
