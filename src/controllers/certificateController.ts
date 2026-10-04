import { Request, Response } from "express";
import { pool } from "../config/db";
import type { CreateCertificateInput, UpdateCertificateInput } from "../types";

export const getAllCertificates = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM certificates ORDER BY issue_date DESC');

    res.status(200).json({
      message: 'Successfully retrieve all certificates',
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCertificate = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateCertificateInput;
    const {
      name,
      organization,
      issue_date,
      certificate_url,
      image_url
    } = body;

    const result = await pool.query(
      `INSERT INTO certificates (name, organization, issue_date, certificate_url, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
       [name, organization, issue_date, certificate_url || null, image_url || null]
    );

    res.status(201).json({
      message: 'Certificate created',
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body as UpdateCertificateInput;

    const result = await pool.query(
      `UPDATE certificates
       SET
        name = COALESCE($1, name),
        organization = COALESCE($2, organization),
        issue_date = COALESCE($3, issue_date),
        certificate_url = COALESCE($4, certificate_url),
        image_url = COALESCE($5, image_url)
      WHERE id = $6 RETURNING *;`,
      [body.name || null, body.organization || null, body.issue_date || null, body.certificate_url || null, body.image_url || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.status(200).json({
      message: 'Certificate updated',
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM certificates WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.status(200).json({ message: 'Certificate deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}