import db from '../services/positions.js';

export const getPositionsList = async (req, res, next) => {
  try {
    const rows = await db.getPositionsList();
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const addPosition = async (req, res, next) => {
  try {
    const position = await db.addPosition(req.body);
    res.status(201).json(position);
  } catch (error) {
    next(error);
  }
};

export const getPositionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const position = await db.getPreparedPositionById(id);
    res.json(position);
  } catch (error) {
    next(error);
  }
};

export const updatePosition = async (req, res, next) => {
  try {
    const positionId = req.params.id;
    const updatedData = req.body;
    const result = await db.updatePosition(positionId, updatedData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deletePosition = async (req, res, next) => {
  try {
    const positionId = req.params.id;
    await db.deletePosition(positionId)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
