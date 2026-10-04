import { Request, Response } from "express";
import { pool } from "../config/db";
import type { CreateExperienceInput, UpdateExperienceInput } from "../types";

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM experiences ORDER BY created_at DESC');

    res.status(200).json({
      message: 'Successfully retrieve all experiences',
      data: result.rows
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateExperienceInput;
    const {
      role,
      company,
      location,
      employment_type,
      start_date,
      end_date,
      is_current,
      description_markdown
    } = body;

    const result = await pool.query(
      `INSERT INTO experiences (role, company, location, employment_type, start_date, end_date, is_current, description_markdown)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
       [role, company, location || null, employment_type, start_date, end_date || null, is_current || null, description_markdown || null]
    );

    res.status(201).json({
      message: 'Experience Created',
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body as UpdateExperienceInput;

    const result = await pool.query(
      `UPDATE experiences
       SET 
        role = COALESCE($1, role),
        company = COALESCE($2, company),
        location = COALESCE($3, location),
        employment_type = COALESCE($4, employment_type),
        start_date = COALESCE($5, start_date),
        end_date = COALESCE($6, end_date),
        is_current = COALESCE($7, is_current),
        description_markdown = COALESCE($8, description_markdown)
      WHERE id = $9 RETURNING *;`,
      [body.role || null, body.company || null, body.location || null, body.employment_type || null, body.start_date || null,
        body.end_date || null, body.is_current || null, body.description_markdown || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.status(200).json({
      message: 'Experience updated',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM experiences WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};