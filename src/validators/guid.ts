import { validate as uuidValidate } from 'uuid';

export const validateGuid = (guid: string): boolean => {
  return uuidValidate(guid);
};
