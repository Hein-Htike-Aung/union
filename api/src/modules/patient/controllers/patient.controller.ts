import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import Patient from '../../../models/patient.model';
import successResponse from '../../../utils/successResponse';
import { get } from 'lodash';
import PatientService from '../services/patient.service';
import getPaginationData from '../../../utils/getPaginationData';
import Township from '../../../models/township.model';
import District from '../../../models/district.model';
import State from '../../../models/state.model';
import likeSearch from '../../../utils/likeSearch';
import { Op } from 'sequelize';

export default class PatientController {
  static createPatient = async (req: Request, res: Response) => {
    try {
      await Patient.create({
        ...req.body,
      });

      return successResponse(res, 'Created');
    } catch (error) {
      handleError(res, error);
    }
  };

  static updatePatient = async (req: Request, res: Response) => {
    try {
      const patient_id = get(req.params, 'patient_id');

      await Patient.update(
        {
          ...req.body,
        },
        {
          where: {
            id: patient_id,
          },
        },
      );

      return successResponse(res, 'Updated');
    } catch (error) {
      handleError(res, error);
    }
  };

  static deletePatient = async (req: Request, res: Response) => {
    try {
      const patient_id = get(req.params, 'patient_id');

      await Patient.destroy({
        where: {
          id: patient_id,
        },
      });

      return successResponse(res, 'Deleted');
    } catch (error) {
      handleError(res, error);
    }
  };

  static patientById = async (req: Request, res: Response) => {
    try {
      const patient_id = get(req.params, 'patient_id');

      const patient = await PatientService.findPatientById(Number(patient_id));

      return successResponse(res, null, { patient });
    } catch (error) {
      handleError(res, error);
    }
  };

  static patientList = async (req: Request, res: Response) => {
    try {
      const { offset, limit } = getPaginationData(req.query);

      const { search } = req.query;

      const township_ids: number[] = [];

      const townships = await Township.findAll({
        where: {
          township: {
            [Op.like]: likeSearch(search),
          },
        },
      });

      townships.forEach((t) => township_ids.push(t.id));

      console.log(township_ids);

      const { rows: patients, count } = await Patient.findAndCountAll({
        offset,
        limit,
        where: {
          [Op.or]: {
            name: {
              [Op.like]: likeSearch(search),
            },
            phone: {
              [Op.like]: likeSearch(search),
            },
            age: {
              [Op.like]: likeSearch(search),
            },
            address: {
              [Op.like]: likeSearch(search),
            },
            township_id: township_ids,
          },
        },
        include: [
          {
            model: Township,
            as: 'township',
            include: [
              {
                model: District,
                as: 'district',
                include: [
                  {
                    model: State,
                    as: 'state',
                  },
                ],
              },
            ],
          },
        ],
      });

      return successResponse(res, null, { patients, count });
    } catch (error) {
      handleError(res, error);
    }
  };
}
