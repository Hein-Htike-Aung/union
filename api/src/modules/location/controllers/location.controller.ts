import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import State from '../../../models/state.model';
import successResponse from '../../../utils/successResponse';
import { get } from 'lodash';
import District from '../../../models/district.model';
import Township from '../../../models/township.model';

export default class LocationController {
  static allStates = async (req: Request, res: Response) => {
    try {
      const states = await State.findAll();

      return successResponse(res, null, { states });
    } catch (error) {
      handleError(res, error);
    }
  };

  static districtByState = async (req: Request, res: Response) => {
    try {
      const state_id = get(req.params, 'state_id');

      const districts = await District.findAll({
        where: {
          state_id,
        },
      });

      return successResponse(res, null, { districts });
    } catch (error) {
      handleError(res, error);
    }
  };

  static townshipByDistrict = async (req: Request, res: Response) => {
    try {
      const district_id = get(req.params, 'district_id');

      const townships = await Township.findAll({
        where: {
          district_id,
        },
      });

      return successResponse(res, null, { townships });
    } catch (error) {
      handleError(res, error);
    }
  };
}
