import axios from 'axios'

const API_URL = 'http://localhost:3000/api/recipes'

export async function getRecipes() {
  const res = await axios.get(API_URL)
  return res.data
}
