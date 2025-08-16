import express from 'express'
import cors from 'cors'
import recipeRoutes from './src/routes/recipes'
import itemRoutes from './src/routes/items'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api/recipes', recipeRoutes)
app.use('/api/items', itemRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
