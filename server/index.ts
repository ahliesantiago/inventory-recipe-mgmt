import express from 'express'
import recipeRoutes from './src/routes/recipes'

const app = express()
app.use(express.json())

app.use('/api/recipes', recipeRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
