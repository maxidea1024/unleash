import { validateSchema } from '../validate';
import type { EmailSchema } from './email-schema';

test('emailSchema', () => {
  const data: EmailSchema = {
    email: '',
  };

  expect(
    validateSchema('#/components/schemas/emailSchema', data),
  ).toBeUndefined();

  expect(
    validateSchema('#/components/schemas/emailSchema', {}),
  ).toMatchSnapshot();
});
