"use strict";

import db from "../db.js";

class Progress {
  /** Create a workout (from data) and add to db
   *
   * data should be { goal_id, weight, reps, date }
   *
   * returns { id, goal_id, weight, reps, date }
   */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO progress(goal_id, weight, reps, date) VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.goal_id, data.weight, data.reps, data.date]
    );

    const progress = result.rows[0];

    return progress;
  }

  /** Given progress id, delete progress from db
   *
   * Throws NotFoundError if progress not found
   */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM progress WHERE id = $1 RETURNING id`,
      [id]
    );

    const progress = result.rows[0];

    if (!progress) throw new NotFoundError(`Workout (id ${id}) not found`);
  }
}

export default Progress;
