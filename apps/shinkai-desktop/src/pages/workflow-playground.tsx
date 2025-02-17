import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@shinkai_network/shinkai-i18n';
import { buildInboxIdFromJobId } from '@shinkai_network/shinkai-message-ts/utils';
import {
  CreateJobFormSchema,
  createJobFormSchema,
} from '@shinkai_network/shinkai-node-state/forms/chat/create-job';
import {
  VRFolder,
  VRItem,
} from '@shinkai_network/shinkai-node-state/lib/queries/getVRPathSimplified/types';
import { useGetVRPathSimplified } from '@shinkai_network/shinkai-node-state/lib/queries/getVRPathSimplified/useGetVRPathSimplified';
import { transformDataToTreeNodes } from '@shinkai_network/shinkai-node-state/lib/utils/files';
import { useCreateJob } from '@shinkai_network/shinkai-node-state/v2/mutations/createJob/useCreateJob';
import { useGetLLMProviders } from '@shinkai_network/shinkai-node-state/v2/queries/getLLMProviders/useGetLLMProviders';
import {
  Badge,
  Button,
  FileUploader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '@shinkai_network/shinkai-ui';
import {
  AISearchContentIcon,
  FilesIcon,
} from '@shinkai_network/shinkai-ui/assets';
import { MoveLeft, MoveRight, PlusIcon, TrashIcon } from 'lucide-react';
import { TreeCheckboxSelectionKeys } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  KnowledgeSearchDrawer,
  VectorFsScopeDrawer,
} from '../components/vector-fs/components/vector-fs-context-drawer';
import { allowedFileExtensions } from '../lib/constants';
import { useAnalytics } from '../lib/posthog-provider';
import { ADD_AGENT_PATH } from '../routes/name';
import { useAuth } from '../store/auth';
import { useExperimental } from '../store/experimental';
import { useSettings } from '../store/settings';
import { SubpageLayout } from './layout/simple-layout';

const WorkflowPlayground = () => {
  const { t } = useTranslation();
  const auth = useAuth((state) => state.auth);
  const workflowHistory = useExperimental((state) => state.workflowHistory);
  const addWorkflowHistory = useExperimental(
    (state) => state.addWorkflowHistory,
  );
  const clearWorkflowHistory = useExperimental(
    (state) => state.clearWorkflowHistory,
  );
  const defaulAgentId = useSettings((state) => state.defaultAgentId);
  const navigate = useNavigate();
  const location = useLocation();
  const { captureAnalyticEvent } = useAnalytics();
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(-1);

  const locationState = location.state as {
    files: File[];
    agentName: string;
    selectedVRFiles: VRItem[];
    selectedVRFolders: VRFolder[];
  };

  const [isVectorFSOpen, setIsVectorFSOpen] = React.useState(false);
  const [isKnowledgeSearchOpen, setIsKnowledgeSearchOpen] =
    React.useState(false);

  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedKeys, setSelectedKeys] =
    useState<TreeCheckboxSelectionKeys | null>(null);

  const selectedFileKeysRef = useRef<Map<string, VRItem>>(new Map());
  const selectedFolderKeysRef = useRef<Map<string, VRFolder>>(new Map());

  const {
    // isPending: isVRFilesPending,
    data: VRFiles,
    isSuccess: isVRFilesSuccess,
  } = useGetVRPathSimplified({
    nodeAddress: auth?.node_address ?? '',
    profile: auth?.profile ?? '',
    shinkaiIdentity: auth?.shinkai_identity ?? '',
    path: '/',
    my_device_encryption_sk: auth?.profile_encryption_sk ?? '',
    my_device_identity_sk: auth?.profile_identity_sk ?? '',
    node_encryption_pk: auth?.node_encryption_pk ?? '',
    profile_encryption_sk: auth?.profile_encryption_sk ?? '',
    profile_identity_sk: auth?.profile_identity_sk ?? '',
  });

  useEffect(() => {
    if (isVRFilesSuccess) {
      setNodes(transformDataToTreeNodes(VRFiles));
    }
  }, [VRFiles, isVRFilesSuccess]);

  const createJobForm = useForm<CreateJobFormSchema>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      files: [],
    },
  });

  const { llmProviders, isSuccess } = useGetLLMProviders({
    nodeAddress: auth?.node_address ?? '',
    token: auth?.api_v2_key ?? '',
  });

  useEffect(() => {
    if (isSuccess && llmProviders?.length && !defaulAgentId) {
      createJobForm.setValue('agent', llmProviders[0].id);
    } else {
      createJobForm.setValue('agent', defaulAgentId);
    }
  }, [llmProviders, createJobForm, defaulAgentId, isSuccess]);

  useEffect(() => {
    if (!locationState?.agentName) {
      return;
    }
    const agent = llmProviders.find(
      (agent) => agent.id === locationState.agentName,
    );
    if (agent) {
      createJobForm.setValue('agent', agent.id);
    }
  }, [createJobForm, locationState, llmProviders]);

  const { isPending, mutateAsync: createJob } = useCreateJob({
    onSuccess: (data, variables) => {
      navigate(
        `/workflow-playground/${encodeURIComponent(buildInboxIdFromJobId(data.jobId))}`,
      );

      addWorkflowHistory(variables.workflowCode as string);

      const files = variables?.files ?? [];
      const localFilesCount = (variables.selectedVRFiles ?? [])?.length;
      const localFoldersCount = (variables.selectedVRFolders ?? [])?.length;

      if (localFilesCount > 0 || localFoldersCount > 0) {
        captureAnalyticEvent('Ask Local Files', {
          foldersCount: localFoldersCount,
          filesCount: localFilesCount,
        });
      }
      if (files?.length > 0) {
        captureAnalyticEvent('AI Chat with Files', {
          filesCount: files.length,
        });
      } else {
        captureAnalyticEvent('AI Chat', undefined);
      }
    },
  });
  useEffect(() => {
    setCurrentWorkflowIndex(workflowHistory.size - 1);
  }, []);

  useEffect(() => {
    if (
      locationState?.selectedVRFiles?.length > 0 ||
      locationState?.selectedVRFolders?.length > 0
    ) {
      const selectedVRFilesPathMap = locationState?.selectedVRFiles?.reduce(
        (acc, file) => {
          selectedFileKeysRef.current.set(file.path, file);
          acc[file.path] = {
            checked: true,
          };
          return acc;
        },
        {} as Record<string, { checked: boolean }>,
      );

      const selectedVRFoldersPathMap = locationState?.selectedVRFolders?.reduce(
        (acc, folder) => {
          selectedFolderKeysRef.current.set(folder.path, folder);
          acc[folder.path] = {
            checked: true,
          };
          return acc;
        },
        {} as Record<string, { checked: boolean }>,
      );

      setSelectedKeys({
        ...selectedVRFilesPathMap,
        ...selectedVRFoldersPathMap,
      });
    }
  }, [locationState?.selectedVRFiles, locationState?.selectedVRFolders]);

  const onSubmit = async (data: CreateJobFormSchema) => {
    if (!auth) return;
    const selectedVRFiles =
      selectedFileKeysRef.current.size > 0
        ? Array.from(selectedFileKeysRef.current.values())
        : [];
    const selectedVRFolders =
      selectedFolderKeysRef.current.size > 0
        ? Array.from(selectedFolderKeysRef.current.values())
        : [];

    await createJob({
      nodeAddress: auth?.node_address ?? '',
      token: auth?.api_v2_key ?? '',
      llmProvider: data.agent,
      content: data.content,
      files: data.files,
      workflowCode: data.workflow,
      isHidden: true,
      selectedVRFiles,
      selectedVRFolders,
    });
  };

  const onWorkflowChange = useCallback(
    (value: string) => {
      createJobForm.setValue('workflow', value);
    },
    [createJobForm],
  );

  const handleWorkflowKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd } = textarea;
        const currentValue = textarea.value;

        const lineStart =
          currentValue.lastIndexOf('\n', selectionStart - 1) + 1;
        const lineEnd = currentValue.indexOf('\n', selectionStart);
        const currentLine = currentValue.substring(
          lineStart,
          lineEnd === -1 ? currentValue.length : lineEnd,
        );
        const indent = currentLine?.match(/^\s*/)?.[0];

        const newValue =
          currentValue.substring(0, selectionStart) +
          '\n' +
          indent +
          currentValue.substring(selectionEnd);

        onWorkflowChange(newValue);

        // wait update before we can set the selection
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            selectionStart + (indent ?? '').length + 1;
        }, 0);
      }
    },
    [onWorkflowChange],
  );

  return (
    <SubpageLayout
      className="max-w-6xl px-3"
      title={t('workflowPlayground.label')}
    >
      <div className="flex h-[calc(100vh_-_150px)] gap-6 overflow-hidden">
        <Form {...createJobForm}>
          <form
            className="flex-1 space-y-8 overflow-y-auto pr-2"
            onSubmit={createJobForm.handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
              <FormField
                control={createJobForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('chat.form.message')}</FormLabel>
                    <FormControl>
                      <Textarea
                        autoFocus={true}
                        className="resize-none"
                        onKeyDown={(event) => {
                          if (
                            event.key === 'Enter' &&
                            (event.metaKey || event.ctrlKey)
                          ) {
                            createJobForm.handleSubmit(onSubmit)();
                          }
                        }}
                        placeholder={t('chat.form.messagePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createJobForm.control}
                name="workflow"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>{t('chat.form.workflows')}</FormLabel>
                    <FormControl>
                      <Textarea
                        autoFocus={true}
                        className="!min-h-[100px] resize-none text-sm"
                        onKeyDown={handleWorkflowKeyDown}
                        placeholder="Workflow"
                        spellCheck={false}
                        {...field}
                      />
                    </FormControl>
                    {Array.from(workflowHistory).length > 0 && (
                      <>
                        <div className="absolute right-3 top-3 flex items-center gap-2">
                          <Button
                            className="h-6 w-6"
                            disabled={currentWorkflowIndex <= 0}
                            onClick={() => {
                              if (currentWorkflowIndex > 0) {
                                setCurrentWorkflowIndex(
                                  (prevIndex) => prevIndex - 1,
                                );
                                createJobForm.setValue(
                                  'workflow',
                                  Array.from(workflowHistory)[
                                    currentWorkflowIndex - 1
                                  ],
                                );
                              }
                            }}
                            size="icon"
                            type="button"
                            variant="outline"
                          >
                            <MoveLeft className="h-3 w-3" />
                          </Button>

                          <Button
                            className="h-6 w-6"
                            disabled={
                              currentWorkflowIndex >= workflowHistory.size - 1
                            }
                            onClick={() => {
                              if (
                                currentWorkflowIndex <
                                workflowHistory.size - 1
                              ) {
                                setCurrentWorkflowIndex(
                                  (prevIndex) => prevIndex + 1,
                                );
                                createJobForm.setValue(
                                  'workflow',
                                  Array.from(workflowHistory)[
                                    currentWorkflowIndex + 1
                                  ],
                                );
                              }
                            }}
                            size="icon"
                            type="button"
                            variant="outline"
                          >
                            <MoveRight className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <Button
                            className="h-6 w-6"
                            onClick={() => {
                              setCurrentWorkflowIndex(-1);
                              createJobForm.setValue('workflow', '');
                              clearWorkflowHistory();
                            }}
                            size="icon"
                            type="button"
                            variant="outline"
                          >
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createJobForm.control}
                name="agent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('chat.form.selectAI')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('chat.form.selectAI')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {llmProviders?.length ? (
                          llmProviders.map((agent) => (
                            <SelectItem key={agent.id} value={agent.id}>
                              <span>{agent.id} </span>
                            </SelectItem>
                          ))
                        ) : (
                          <Button
                            onClick={() => {
                              navigate(ADD_AGENT_PATH);
                            }}
                            variant="ghost"
                          >
                            <PlusIcon className="mr-2" />
                            {t('llmProviders.add')}
                          </Button>
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="my-3 rounded-md bg-gray-400 px-3 py-4">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-gray-100">
                      {t('chat.form.setContext')}
                    </h2>
                    <p className="text-gray-80 text-xs">
                      {t('chat.form.setContextText')}
                    </p>
                  </div>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg p-2.5 text-left hover:bg-gray-500"
                          onClick={() => setIsKnowledgeSearchOpen(true)}
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          <AISearchContentIcon className="h-5 w-5" />
                          <p className="sr-only text-xs text-white">
                            AI Files Content Search
                          </p>
                        </Button>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent sideOffset={0}>
                          Search AI Files Content
                        </TooltipContent>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button
                    className="hover:bg-gray-350 flex h-[40px] items-center justify-between gap-2 rounded-lg p-2.5 text-left"
                    onClick={() => setIsVectorFSOpen(true)}
                    size="auto"
                    type="button"
                    variant="outline"
                  >
                    <div className="flex items-center gap-2">
                      <FilesIcon className="h-4 w-4" />
                      <p className="text-sm text-white">Local AI Files</p>
                    </div>
                    {Object.keys(selectedKeys ?? {}).length > 0 && (
                      <Badge className="bg-brand text-white">
                        {Object.keys(selectedKeys ?? {}).length}
                      </Badge>
                    )}
                  </Button>
                  <FormField
                    control={createJobForm.control}
                    name="files"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Upload a file</FormLabel>
                        <FormControl>
                          <FileUploader
                            accept={allowedFileExtensions.join(',')}
                            allowMultiple
                            descriptionText={allowedFileExtensions?.join(' | ')}
                            onChange={(acceptedFiles) => {
                              field.onChange(acceptedFiles);
                            }}
                            shouldDisableScrolling
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={isPending}
              isLoading={isPending}
              size="sm"
              type="submit"
            >
              Try Workflow
            </Button>
          </form>
        </Form>
        <div className="flex h-full flex-1 flex-col">
          <Outlet />
        </div>
      </div>

      <VectorFsScopeDrawer
        isVectorFSOpen={isVectorFSOpen}
        nodes={nodes}
        onSelectedKeysChange={setSelectedKeys}
        onVectorFSOpenChanges={setIsVectorFSOpen}
        selectedFileKeysRef={selectedFileKeysRef}
        selectedFolderKeysRef={selectedFolderKeysRef}
        selectedKeys={selectedKeys}
      />
      <KnowledgeSearchDrawer
        isKnowledgeSearchOpen={isKnowledgeSearchOpen}
        onSelectedKeysChange={setSelectedKeys}
        selectedFileKeysRef={selectedFileKeysRef}
        selectedKeys={selectedKeys}
        setIsKnowledgeSearchOpen={setIsKnowledgeSearchOpen}
      />
    </SubpageLayout>
  );
};
export default WorkflowPlayground;
