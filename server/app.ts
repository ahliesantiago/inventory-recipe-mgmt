import express from 'express'
import cors from 'cors'
import recipeRoutes from './src/routes/recipes'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api/recipes', recipeRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
