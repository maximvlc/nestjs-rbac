import { IStorageRbac } from '../../src/services/interfaces/storage.rbac.interface';
import { TestFilterOne } from './filters/test.filter.one';
import { TestFilterTwo } from './filters/test.filter.two';
import { RBAC_REQUEST_FILTER } from '../../src/constans';
import { RequestFilter } from './filters/request.filter';

export const RBAC: IStorageRbac = {
  roles: ['admin', 'user'],
  permissions: {
    permission1: ['create', 'update', 'delete'],
    permission2: ['create', 'update', 'delete'],
    permission3: ['filter1', 'filter2', RBAC_REQUEST_FILTER],
    permission4: ['create', 'update', 'delete'],
  },
  grants: {
    admin: [
      '&user',
      'permission1',
      `permission3@${RBAC_REQUEST_FILTER}`,
      'permission3@filter1',
      'permission3@filter2',
    ],
    user: ['user', 'permission2'],

  },
  filters: {
    filter1: TestFilterOne,
    filter2: TestFilterTwo,
    [RBAC_REQUEST_FILTER]: RequestFilter,
  },
};
