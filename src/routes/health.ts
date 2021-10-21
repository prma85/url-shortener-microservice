import { Router } from 'express';

import HealthController from '../controllers/health';

const router = Router();

router.get('/', (_req, res) => {
  const controller = new HealthController();
  const response = controller.getStatus();
  return res.send(response);
});

export default router;
