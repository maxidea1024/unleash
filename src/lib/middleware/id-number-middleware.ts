import { BadDataError } from '../error';

// TODO: 함수 이름은 변경하는게 좋을듯함.
const idNumberMiddleware = (): any => {
  return async (req, res, next) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      res.status(400).send(
        new BadDataError('ID should be an integer').toJSON(),
      );
      return;
    }

    next();
  };
};

export default idNumberMiddleware;
