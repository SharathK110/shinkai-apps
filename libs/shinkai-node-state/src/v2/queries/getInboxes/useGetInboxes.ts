import { useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import { getInboxes } from '.';
import { GetInboxesInput, Options } from './types';

export const useGetInboxes = (
  input: GetInboxesInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_INBOXES, input],
    queryFn: async () => getInboxes(input),
    select: (data) =>
      // display only job inboxes
      data.filter((inbox) => inbox?.inbox_id?.split('::')?.[0] === 'job_inbox'),
    ...options,
  });
  return {
    ...response,
    inboxes: response.data ?? [],
  };
};
