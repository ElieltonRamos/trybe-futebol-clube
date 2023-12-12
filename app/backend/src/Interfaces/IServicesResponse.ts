import { StatusHTTP } from '../utils/mapStatusHTPP';

export type ServiceResponse<type> = {
  status: StatusHTTP,
  data: type | { message: string }
};
