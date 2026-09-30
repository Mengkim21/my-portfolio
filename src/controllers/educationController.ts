import { Request, Response } from "express";
import { pool } from "../config/db";
import type { ParamsDictionary } from 'express-serve-static-core';
import type { CreateEducationInput, UpdateEducationInput } from "../types";

export const getAllEducations = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM educations ORDER BY start_date DESC');

    res.status(200).json({
      message: 'Successfully retrieve all educations',
      data: result.rows
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEducation = async (req: Request<ParamsDictionary, unknown, CreateEducationInput>, res: Response) => {
  try {
    const {
      institution,
      degree,
      field_of_study,
      start_date,
      end_date,
      location,
      grade,
      description
    } = req.body;

    const result = await pool.query(
      `INSERT INTO educations (institution, degree, field_of_study, start_date, end_date, location, grade, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
       [institution, degree, field_of_study || null, start_date, end_date || null, location || null, grade || null, description || null]
    );

    res.status(201).json({
      message: 'Education created successfully',
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEducation = async (req: Request<{ id: string }, unknown, UpdateEducationInput>, res: Response) => {
  try {
    const { id } = req.params;
    const {
      institution,
      degree,
      field_of_study,
      start_date,
      end_date,
      location,
      grade,
      description
    } = req.body;

    const result = await pool.query(
      `UPDATE educations
       SET 
        institution = COALESCE($1, institution), 
        degree = COALESCE($2, degree),
        field_of_study = COALESCE($3, field_of_study),
        start_date = COALESCE($4, start_date),
        end_date = COALESCE($5, end_date),
        location = COALESCE($6, location),
        grade = COALESCE($7, grade),
        description = COALESCE($8, description)
      WHERE id = $9 RETURNING *;`,
      [institution || null, degree || null, field_of_study || null, 
        start_date || null, end_date || null, location || null, 
        grade || null, description || null, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: 'Education not found' });
    res.status(201).json({
      message: 'Education updated',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEducation = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM educations WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Education not found' });

    res.status(201).json({ message: 'Education deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}