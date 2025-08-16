import { Request, Response } from 'express'
import * as UnitModel from '../models/unit-model'

export async function getUnits(req: Request, res: Response) {
  try {
    const units = await UnitModel.getAllUnits()
    res.json(units)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch units' })
  }
}
