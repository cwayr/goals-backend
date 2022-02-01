"use strict";

import express from "express";
import Goal from "../models/goal.js";

const router = express.Router();

/** POST / { goal } => { goal }
 *
 * goal must include { name, username, target, timeline, start_date, end_date }
 *
 * returns { id, name, username, target, timeline, start_date, end_date }
 */

router.post("/", async (req, res, next) => {
  try {
    const goal = await Goal.create(req.body);
    return res.status(201).json({ goal });
  } catch (err) {
    return next(err);
  }
});

/** GET /[goal_id] => { goal }
 *
 * returns { id, name, username, target, timeline, start_date, end_date }
 */

router.get("/:goal_id", async (req, res, next) => {
  try {
    const goal = await Goal.get(req.params.goal_id);
    return res.json({ goal });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username] => { deleted: [username] } */

router.delete("/:goal_id", async (req, res, next) => {
  try {
    await Goal.remove(req.params.goal_id);
    return res.json({ deleted: [req.params.goal_id] });
  } catch (err) {
    return next(err);
  }
});

export default router;
