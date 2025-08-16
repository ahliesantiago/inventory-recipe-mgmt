import { Request, Response } from 'express'
import * as ItemModel from '../models/item-model'

export async function getItems(req: Request, res: Response) {
  try {
    const items = await ItemModel.getAllItems()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' })
  }
}

export async function getItemIngredients(req: Request, res: Response) {
  try {
    const items = await ItemModel.getAllItems(true)
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items that are ingredients' })
  }
}
