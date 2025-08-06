import {
  Home,
  Package,
  ChefHat,
  ShoppingCart,
  Tags,
} from 'lucide-vue-next'

export interface NavigationItem {
  id: string
  label: string
  icon: any
  description?: string
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    description: 'Overview of your kitchen management'
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    description: 'Track your pantry, ingredients, supplies, equipment, and other things at home'
  },
  {
    id: 'recipes',
    label: 'Recipes',
    icon: ChefHat,
    description: 'Manage your recipe collection'
  },
  {
    id: 'lists',
    label: 'Lists',
    icon: ShoppingCart,
    description: 'Create and manage shopping lists'
  },
  {
    id: 'items',
    label: 'Items',
    icon: Tags,
    description: 'Master list of ingredients and categories'
  }
]