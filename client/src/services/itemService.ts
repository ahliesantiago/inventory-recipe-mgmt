import axios from 'axios'

const API_URL = 'http://localhost:3000/api/items'

export async function getItems() {
  const res = await axios.get(API_URL)
  return res.data
}

export async function getIngredients() {
  const res = await axios.get(`${API_URL}/ingredients`)
  return res.data
}

// export async function getItemById(id: string) {
//   const res = await axios.get(`${API_URL}/${id}`)
//   return res.data
// }

// export async function createItem(inputData: Item) {
//   const res = await axios.post(API_URL, inputData)
//   return res.data
// }

// export async function updateItem(itemId: string, inputData: Item) {
//   const res = await axios.put(`${API_URL}/${itemId}`, inputData)
//   return res.data
// }

// export async function deleteItem(itemId: string) {
//   await axios.delete(`${API_URL}/${itemId}`)
// }
