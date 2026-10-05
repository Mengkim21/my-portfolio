import { Request, Response } from "express";
import { pool } from "../config/db";
import type { CreateSkillInput, UpdateSkillInput } from "../types";

export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY category, name ASC');
    
    res.status(200).json({
      message: 'Successfully retrieve all skills',
      data: result.rows
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateSkillInput;
    const {
      name,
      category,
      proficiency_level
    } = body;

    const result = await pool.query(
      `INSERT INTO skills (name, category, proficiency_level)
       VALUES ($1, $2, $3) RETURNING *`,
       [name, category, proficiency_level]
    );

    res.status(201).json({
      message: 'Skill created',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body as UpdateSkillInput;

    const result = await pool.query(
      `UPDATE skills
       SET 
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        proficiency_level = COALESCE($3, proficiency_level)
      WHERE id = $4 RETURNING *`,
      [body.name || null, body.category || null, body.proficiency_level || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.status(200).json({
      message: 'Skill created',
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM skills WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}