import joi from 'joi';
import type { Response } from 'express';
import type { Logger } from '../logger';
import { GanpaError } from '../error/ganpa-error';
import { fromLegacyError } from '../error/from-legacy-error';
import createError from 'http-errors';

export const customJoi = joi.extend((j) => ({
  type: 'isUrlFriendly',
  base: j.string(),
  messages: {
    'isUrlFriendly.base': '{{#label}} must be URL friendly',
  },
  validate(value, helpers) {
    // Base validation regardless of the rules applied
    if (
      encodeURIComponent(value) !== value ||
      value === '..' ||
      value === '.'
    ) {
      // Generate an error, state and options need to be passed
      return { value, errors: helpers.error('isUrlFriendly.base') };
    }

    return undefined;
  },
}));

export const nameType = customJoi.isUrlFriendly().min(1).max(100).required();

export const handleErrors: (
  res: Response,
  logger: Logger,
  error: Error,
) => void = (res, logger, error) => {
  if (createError.isHttpError(error)) {
    return res
      .status(
        (error as any).status ?? 400,
      )
      .json({ message: error.message });
  }

  const finalError =
    error instanceof GanpaError ? error : fromLegacyError(error);

  const format = (thing: object) => JSON.stringify(thing, null, 2);

  if (!(error instanceof GanpaError)) {
    logger.debug(
      `I encountered an error that wasn't an instance of the \`GanpaError\` type. The original error was: ${format(error)}. It was mapped to ${format(finalError.toJSON())}`,
    );
  }

  if (finalError.statusCode === 500) {
    logger.error(`Server failed executing request: ${format(error)}`, error);
  }

  return res.status(finalError.statusCode).json(finalError).end();
};
