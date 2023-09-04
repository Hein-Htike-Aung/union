import express from 'express';
import LocationController from '../controllers/location.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { district_idParam, state_idParam } from '../schemas/location.schema';

const router = express.Router();

router.get('/v1/locations/states', LocationController.allStates);

router.get(
  '/v1/locations/districts/by_state/:state_id',
  [validateRequest(state_idParam)],
  LocationController.districtByState,
);
router.get(
  '/v1/locations/townships/by_district/:district_id',
  [validateRequest(district_idParam)],
  LocationController.townshipByDistrict,
);

export default router;
