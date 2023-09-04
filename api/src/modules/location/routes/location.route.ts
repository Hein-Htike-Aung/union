import express from 'express';
import LocationController from '../controllers/location.controller';

const router = express.Router();

router.get('/v1/locations/states', LocationController.allStates);

router.get(
  '/v1/locations/districts/by_state/:state_id',
  LocationController.districtByState,
);
router.get(
  '/v1/locations/townships/by_district/:district_id',
  LocationController.townshipByDistrict,
);

export default router;
