import { ParsedQs } from '../../types';

const likeSearch = (
  value: string | ParsedQs | string[] | ParsedQs[] | undefined,
) => `%${value || ''}%`;

export default likeSearch;
