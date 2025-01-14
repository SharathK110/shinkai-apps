import { sendMessageToJob as sendMessageToJobApi } from '@shinkai_network/shinkai-message-ts/api/jobs/index';

import { SendMessageToJobInput } from './types';

export const sendMessageToJob = async ({
  nodeAddress,
  token,
  jobId,
  message,
  parent,
  workflowCode,
  workflowName,
}: SendMessageToJobInput) => {
  return await sendMessageToJobApi(nodeAddress, token, {
    job_message: {
      workflow_code: workflowCode,
      content: message,
      workflow_name: workflowName,
      job_id: jobId,
      files_inbox: '',
      parent: parent,
    },
  });
};
