import 'dotenv/config'
import db from '../index'
import * as seedCategories from './seed_categories'
import * as seedIngredients from './seed_ingredients'

async function runSeeds() {
  try {
    console.log('Starting seed...')
    await seedCategories.up(db)
    await seedIngredients.up(db)
    console.log('Seeding complete.')
    process.exit(0)
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

runSeeds()
