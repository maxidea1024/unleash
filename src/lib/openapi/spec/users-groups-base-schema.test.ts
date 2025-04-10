import { validateSchema } from '../validate';
import type { UsersGroupsBaseSchema } from './users-groups-base-schema';

test('usersGroupsBaseSchema', () => {
  const data: UsersGroupsBaseSchema = {
    users: [
      {
        id: 1,
      },
    ],
  };
  expect(
    validateSchema('#/components/schemas/usersGroupsBaseSchema', data),
  ).toBeUndefined();
});
