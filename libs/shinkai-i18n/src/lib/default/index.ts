export default {
  extension: {
    welcome:
      'Transform your web browsing experience using AI with Shinkai Visor ✨',
  },
  desktop: {
    welcome: 'Welcome to Shinkai ✨',
    welcomeText:
      'Transform your desktop experience using AI with Shinkai Desktop',
    localAI: 'Shinkai Local AI',
    benefits: {
      local:
        '<b>Local:</b> With a local Shinkai, you gain complete control over your data in a secure environment.',
      privacy:
        '<b>Privacy-Focused:</b> Your data remains secure with offline capabilities and strong privacy protections.',
      tools:
        '<b>Tools for Everyday Tasks:</b> Supports 100+ integrations and counting.',
    },
    model: {
      installation: 'Installing {{modelName}}...',
      downloading: 'Downloading',
      embeddingBenefits: {
        efficient:
          '<b>Compact Size & Efficient:</b> With only 22 million parameters and a 384-dimensional embedding vector, the Arctic-embed-xs is designed to be resource-efficient.',
        highRetrieval:
          '<b>High Retrieval Performance:</b> It can effectively retrieve relevant information from large datasets, with high accuracy in search and retrieval tasks.',
        dataAnalysis:
          '<b>Improved Data Analysis:</b> Extract meaningful insights from unstructured data, improving decision-making processes and operational efficiency.',
      },
      gemmaBenefits: {
        performance:
          '<b>High Performance in a Compact Size:</b>The gemma2:2b model is designed to deliver class-leading performance while maintaining a relatively small size of 2 billion parameters. ',
        fast: '<b>Fast Execution:</b> Users have noted that it runs efficiently on mid-range hardware, enabling faster responses and smoother interactions without significant lag.',
        lightweight:
          '<b>Lightweight:</b>This lightweight nature means it requires less memory and computational power, making it accessible for a wider range of users and applications.',
      },
      ollamaBenefits: {
        resource:
          "<b>Efficient Resource Usage:</b> It's a light-weight, ultra-fast model compared to larger models.",
        language:
          '<b>Powerful Language Generation:</b> Generate human-like text across a variety of applications such as content generation, language translation, and coding assistance.',
        multilingual:
          '<b>Multilingual Support:</b> The model supports dialogues in multiple languages including English, Spanish, French, German and more',
      },
    },
  },
  layout: {
    sidebar: {
      toggle: 'Toggle Sidebar',
    },
    menuItems: {
      chats: 'Chats',
      aiTasks: 'AI Tasks',
      vectorFs: 'My AI Files Explorer',
      vectorSearch: 'AI Files Content Search',
      workflowPlayground: 'Workflow Playground',
      subscriptions: 'Browse Subscriptions',
      mySubscriptions: 'My Subscriptions',
      agents: 'AIs',
      settings: 'Settings',
      disconnect: 'Disconnect',
    },
  },
  chatDM: {
    create: 'Create DM Chat',
    form: {
      shinkaiIdentity: 'Shinkai Identity',
      message: 'Message',
      messagePlaceholder: 'Enter your message',
    },
  },
  chat: {
    chats: 'Chats',
    emptyStateTitle: 'Ask Shinkai AI',
    emptyStateDescription:
      'Try “How to make a HTTP request in JavaScript” , “Give me the top 10 rock music in the 80s”, “Explain me how internet works”',
    create: 'Create AI Chat',
    allMessagesLoaded: 'All previous messages have been loaded ✅',
    limitReachedTitle: 'Limit Reached',
    limitReachedDescription:
      "You've used all of your queries for the month on this model/agent. Please start a new chat with another agent.",
    enterMessage: 'Enter Message',
    sendMessage: 'Send Message',
    form: {
      message: 'Tell us the job you want to do',
      messagePlaceholder: 'Eg: Explain me how internet works...',
      workflows: 'Workflows',
      selectAI: 'Select your AI',
      setContext: 'Set Chat Context',
      setContextText:
        'Add files or folders for your AI to use as context during your conversation.',
      selectedText: 'Your selected text',
    },
    context: {
      title: 'Conversation Context',
      description:
        'List of folders and files used as context for this conversation',
    },
    actives: {
      label: 'Actives',
      notFound: 'No active conversations found.',
    },
    archives: {
      label: 'Archives',
      archive: 'Archive',
      archived: 'Archived',
      notFound: 'No archived conversations found.',
      success: 'Your conversation has been archived',
      error: 'Error archiving job',
    },
    editMessage: {
      warning: 'This will restart your conversation from here.',
    },
    fileProcessing: {
      title: 'Your file is being processed',
      description: 'It can take a few minutes',
    },
  },
  aiFilesSearch: {
    label: 'AI Files Content Search',
    description:
      'Search to find content across all files in your AI Files easily',
    foundResults: 'Found {{count}} results',
    filesSelected: 'Selected {{count}} files',
  },
  vectorFs: {
    label: 'My AI Files Explorer',
    localFiles: 'Local AI Files',
    allFiles: 'All Files',
    sharedFolders: 'Shared Folders',
    actions: {
      addNew: 'Add New',
      createFolder: 'Add New Folder',
      uploadFile: 'File Upload',
      share: 'Share',
      unshare: 'Unshare',
      move: 'Move',
      copy: 'Copy',
      delete: 'Delete',
      searchWithinFolder: 'Search within folder',
      uploadFileText:
        'Uploading your files transforms them to be AI-ready and available to use in Shinkai.',
      shareFolderText:
        'You can share folders that you store in AI Files with anyone.',
      unshareFolderText:
        'Everyone will be removed from this folder. You’ll still keep a copy of this folder in your AI Files. <br /> Note: Removed members will keep a copy of this shared folder.',
    },
    forms: {
      folderName: 'Folder Name',
      folderDescription: 'Folder Description',
    },
    pending: {
      filesUploading: 'Uploading files',
    },
    success: {
      folderMoved: 'Folder moved successfully',
      folderDeleted: 'Folder has been deleted',
      folderCopied: 'Folder copied successfully',
      folderShared: 'Folder shared successfully',
      folderUnshared: 'Folder unshared successfully',
      folderCreated: 'Folder created successfully',
      filesUploaded: 'Files uploaded successfully',
      fileMoved: 'File moved successfully',
      fileDeleted: 'File has been deleted',
      fileCopied: 'File copied successfully',
    },
    errors: {
      folderMoved: 'Error moving folder',
      folderDeleted: 'Error deleting folder',
      folderCopied: 'Error copying folder',
      folderShared: 'Error sharing folder',
      folderUnshared: 'Error unsharing folder',
      folderCreated: 'Error creating folder',
      filesUploaded: 'Error uploading files',
      fileMoved: 'Error moving file',
      fileDeleted: 'Error deleting file',
      fileCopied: 'Error copying file',
    },
    home: 'Home',
    emptyState: {
      noFilesAndFolders: 'This will be the home for all your files.',
      noFilesAndFoldersDescription:
        'Use the "+" button to start uploading files.',
      noFiles: 'No files found',
      noSharedFolders: 'Your shared folders will be displayed here.',
    },
    filesSelected: '{{count}} selected',
    deleteFolderConfirmation:
      'Are you sure you want to delete this folder? This action cannot be undone.',
    deleteFileConfirmation:
      'Are you sure you want to delete this file? This action cannot be undone.',
    shareFolderWarning: {
      title: 'Enable Folder Sharing',
      text: 'You must register a Shinkai identity before you can share folders over the Shinkai Network.',
      action: 'Click Here to Learn How',
    },
  },
  subscriptions: {
    label: 'My Subscriptions',
    browse: 'Browse Public Subscriptions',
  },
  inboxes: {
    updateName: 'Update inbox name',
    inboxName: 'Name',
  },
  shinkaiNode: {
    restartNode: 'Please restart your Shinkai Node',
    nodeAddress: 'Node Address',
    nodeVersion: 'Node Version',
    unavailable: 'Your Shinkai Node is unavailable',
    notifications: {
      startingNode: 'Starting your local Shinkai Node',
      runningNode: 'Your local Shinkai Node is running',
      stoppedNode: 'Your local Shinkai Node was stopped',
      stopNode: 'Stopping your local Shinkai Node',
      removedNote: 'Your local Shinkai Node storage was removed',
      startingOllama: 'Starting your Ollama',
      runningOllama: 'Your Ollama is running',
      stoppedOllama: 'Your local Ollama was stopped',
      stopOllama: 'Stopping your local Ollama',
      syncedOllama: 'Local Ollama models synchronized with your Shinkai Node',
      errorSyncOllama:
        'Error synchronizing your local Ollama models with your Shinkai Node',
      optionsRestored: 'Options restored to default values',
      startingDownload: 'Starting downloading {{modelName}}',
      downloadingModel: 'Downloading AI model {{modelName}} - {{progress}}%',
      downloadedModel: 'AI model {{modelName}} downloaded successfully',
      installingModel: 'Installing {{modelName}} ...',
    },
    manager: 'Shinkai Node Manager',
    resetNodeWarning: {
      title: 'Unable to connect',
      description:
        'Your Shinkai Node is currently locked by existing keys. To connect again, you can reset all your Shinkai Node data.',
      option1:
        '<b>Restore:</b> Try to restore your connection using a backed up keys.',
      option2:
        '<b>Reset Data:</b> Permanently delete all your Shinkai Node data.',
      option3:
        '<b>Reset All:</b> Permanently delete all your Shinkai Node data including the encryption and signing keys.',
    },
    models: {
      labels: {
        models: 'Models',
        quality: 'Quality',
        tags: 'Tags',
        bookPages: 'Up to {{pages}} Pages of Content',
        showAll: 'Show all models',
        showRecommended: 'Show recommended models',
        visionCapability: 'Image To Text',
        textCapability: 'Text Generation',
      },
      success: {
        modelRemoved: 'Model {{modelName}} removed successfully',
        modelInstalled: 'Model {{modelName}} installed successfully',
      },
      errors: {
        modelRemoved: 'Error removing model {{modelName}}',
        modelInstalled: 'Error installing model {{modelName}}',
      },
      poweredByOllama: 'Powered by Ollama',
    },
  },
  onboardingChecklist: {
    getStartedText: 'Get Started with Shinkai',
    getStartedChecklist: 'Get started checklist',
    setupShinkaiDesktop: 'Setup Shinkai Desktop',
    setupShinkaiDesktopDescription: 'Setup Shinkai Desktop to get started',
    addAI: 'Add AI',
    addAIDescription: 'Add an AI agent that utilizes your favorite LLM',
    createAIChat: 'Create AI Chat',
    createAIChatDescription: 'Start a conversation with your AI',
    uploadAFile: 'Upload a File',
    uploadAFileDescription:
      'Keep your notes, websites, docs and others securely stored in one place.',
    askFiles: 'Ask Questions to Files',
    askFilesDescription:
      'Chat with your files. Ask any questions, find information, get summaries and more.',
    askFilesButton: 'Create Chat with Files',
    dismiss: 'Dismiss Checklist',
    completedSteps: 'You have completed all steps',
  },
  settings: {
    label: 'Settings',
    description: 'Manage your account settings preferences.',
    defaultAgent: 'Default AI',
    layout: {
      general: 'General',
      shinkaiNode: 'Shinkai Node Manager',
      exportConnection: 'Export Connection',
      createRegistrationCode: 'Create Registration Code',
      analytics: 'Analytics',
      publicKeys: 'Public Keys',
      galxe: 'Galxe Quest',
    },
    shinkaiIdentity: {
      label: 'Shinkai Identity',
      updatedIdentity: 'Shinkai Identity updated successfully.',
      registerIdentity: 'Register your Shinkai Identity',
      goToShinkaiIdentity: 'Go to My Shinkai Identity',
      success: 'Shinkai Identity updated successfully',
      error: 'Error updating Shinkai Identity',
      checkIdentityInSync: 'Verify Shinkai Identity',
      checkIdentityInSyncDescription:
        'Check that your shinkai identity are accurately in sync.',
    },
    general: 'General',
    sidebar: {
      label: 'Sidebar',
      blacklistedWebsites: 'Blacklisted Websites',
      includeClickSummary: {
        title: 'Include 1-Click Summary Option',
        text: 'Adds a Summary Button to the Quick Access hover menu.',
      },
      includeClickImageCapture: {
        title: 'Include 1-Click Image Capture Option',
        text: 'Adds an Image Capture Button to the Quick Access hover menu.',
      },
    },
    quickAccessButton: {
      label: 'Show Shinkai Quick Access Button',
      description:
        'The Quick Access Button can be moved by clicking and holding.',
    },
    experimentalFeature: {
      label: 'Enable Experimental Features',
    },
    language: {
      label: 'Language',
      selectLanguage: 'Select Language',
    },
    shinkaiVersion: 'Shinkai Desktop Version:',
    shortcutKey: {
      label: 'Shortcut Key',
      description: 'Modify the shortcut key to launch sidebar',
    },
    exportConnection: {
      label: 'Export connection',
    },
    registerNewCode: {
      label: 'Register new device',
    },
    publicKeys: {
      label: 'Public Keys',
      show: 'Show Public Keys',
      nodePublicKeys: 'Node Public Keys',
      profilePublicKeys: 'Profile Public Keys',
      myDevicePublicKeys: 'My Device Public Keys',
      nodeEncryption: 'Node Encryption',
      nodeSignature: 'Node Signature',
      profileEncryption: 'Profile Encryption',
      profileIdentity: 'Profile Identity',
      myDeviceEncryption: 'My Device Encryption',
      myDeviceIdentity: 'My Device Identity',
    },
  },
  exportConnection: {
    label: 'Export Connection',
    generateFile: 'Generate connection file',
    downloadText: 'Download and keep this connection file in a safe place',
    restoreText:
      'Use it with your passphrase to restore the connection to your Shinkai Node',
    form: {
      passphrase: 'Passphrase',
      repeatPassphrase: 'Repeat Passphrase',
    },
  },
  restoreConnection: {
    label: 'Restore Connection',
    restore: 'Restore',
    description: 'Use a connection file and passphrase',
    form: {
      encryptedConnectionFile: 'Encrypted Connection File',
      passphrase: 'Passphrase',
    },
  },
  registrationCode: {
    label: 'Registration Code',
    create: 'Create Registration Code',
  },
  common: {
    search: 'Search',
    next: 'Next',
    enabled: 'Enabled',
    configure: 'Configure',
    create: 'Create',
    restore: 'Restore',
    retry: 'Retry',
    copy: 'Copy',
    resetData: 'Reset Data',
    resetAll: 'Reset All',
    clickToUpload: 'Click to upload or drag and drop',
    upload: 'Upload',
    clearSearch: 'Clear Search',
    searchPlaceholder: 'Search...',
    uploadFile: 'Upload a File',
    folders: 'Folders',
    folderWithCount_one: '{{count}} Folder',
    folderWithCount_other: '{{count}} Folders',
    files: 'Files',
    file: 'File',
    fileWithCount_one: '{{count}} File',
    fileWithCount_other: '{{count}} Files',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    connect: 'Connect',
    rename: 'Rename',
    disconnect: 'Disconnect',
    soon: 'soon',
    back: 'Back',
    edit: 'Edit',
    send: 'Send',
    editMessage: 'Edit Message',
    delete: 'Delete',
    update: 'Update',
    moreOptions: 'More Options',
    comingSoon: 'Coming soon - Late August',
    noThanks: 'No, Thanks',
    iAgree: 'I Agree',
    getStarted: 'Get Started',
    passphrase: 'Passphrase',
    repeatPassphrase: 'Confirm passphrase',
    optIn: 'Opt In',
    optOut: 'Opt Out',
    logInShinkaiHosting: 'Log In To Shinkai Hosting',
    signUpShinkaiHosting: 'Sign up For Shinkai Hosting',
    quickConnect: 'Quick Connect',
    alreadyHaveNode: 'Already have a Node?',
    shinkaiPrivate: 'Setup Your Local AI',
    seeOptions: 'See Options',
    termsAndConditionsText:
      'I agree to our <a>Terms of Service</a> and <b>Privacy Policy</b>',
    recommended: 'Recommended',
    remove: 'Remove',
    install: 'Install',
    unselectAll: 'Unselect All',
    done: 'Done',
    resetFilters: 'Reset Filters',
    folderLocation: 'Folder Location:',
    installed: 'Installed',
  },
  quickConnection: {
    label: 'Quick Connection',
    form: {
      nodeAddress: 'Node Address',
      connect: 'Connect',
    },
    connectingToNode: 'Connecting to your local Shinkai Node',
  },
  analytics: {
    label: 'Analytics',
    title: 'Help us improve Shinkai',
    bulletPoints: {
      one: '<check/> Always allow you to opt-out via Settings',
      two: '<check/> Randomized Analytics',
      three:
        '<check/> Send analytical information about what features you use but without any content or responses',
      four: '<x/> Never collect your IP address',
      five: '<x/> Never collect your AI queries',
      six: '<x/> Never use personal information for training purposes',
    },
    moreInfo:
      'Fore more information in relation to our privacy practices, please see our <a>Privacy Policy</a>',
  },
  llmProviders: {
    label: 'AIs',
    add: 'Add AI',
    addManually: 'Manually Add AI',
    delete: {
      label: 'Delete AI',
      description:
        'Are you sure you want to delete this AI? This action cannot be undone.',
    },
    switch: 'Switch AI',
    notFound: {
      title: 'No available AIs',
      description:
        'Connect your first AI to start asking Shinkai AI. Try connecting OpenAI',
    },
    localAI: {
      installTitle: 'Install AI Models',
      installText:
        'After installing AI models on your local machine, they will become available as AI',
    },
    form: {
      agentName: 'AI Name',
      externalUrl: 'External URL',
      apiKey: 'API Key',
      modelName: 'Model Name',
      modelId: 'Model ID',
      modelType: 'Model Type',
      toggleCustomModel: 'Add a custom model',
      selectModel: 'Select your Model',
    },
    success: {
      createAgent: 'AI created successfully',
      deleteAgent: 'AI deleted successfully',
      updateAgent: 'AI updated successfully',
    },
    errors: {
      createAgent: 'Error adding AI',
      updateAgent: 'Error updating AI',
      deleteAgent: 'Error deleting AI',
    },
  },
  workflowPlayground: {
    label: 'Workflow Playground',
  },
  ollama: {
    errors: {
      failedToFetch:
        'Failed to fetch local Ollama models. Please ensure Ollama is running correctly.',
    },
  },
  galxe: {
    label: 'Galxe Quest',
    goToGalxeQuest: 'Check our Galxe Quest',
    form: {
      evmAddress: 'EVM Address',
      evmAddressHelper: 'Add the EVM Address you are using in Galxe',
      signature: 'Signature',
      proof: 'Proof',
      registerInstallation: 'Register Installation',
    },
    success: {
      registerDesktopInstallation:
        'Your Shinkai Desktop installation was registered successfully. It may take some hours to be registered in Galxe quest.',
    },
    errors: {
      registerDesktopInstallation:
        'Error registering your Shinkai Desktop installation. Please ensure your EVM Address was not used previously to register a different installation.',
    },
  },
  sheet: {
    label: 'Shinkai Sheet',
    emptyStateTitle: 'No Sheets found.',
    emptyStateDescription: 'Start connecting your data with Shinkai Sheet!',
    actions: {
      createProject: 'Create Project',
      deleteProject: 'Delete Project',
      deleteProjectConfirmationTitle: 'Delete this Project?',
      deleteProjectConfirmationDescription:
        'This project will be deleted immediately. You can not undo this action.',
    },
    form: {
      projectName: 'Project Name',
    },
  },
  tools: {
    label: 'Shinkai Tools',
    emptyState: {
      search: {
        text: 'No tools found for the search query',
      },
    },
  },
  disconnect: {
    modalTitle: 'Disconnect Shinkai',
    modalDescription:
      'Are you sure you want to disconnect? This will permanently delete your data',
    exportConnection:
      'Before continuing, please<Link>export your connection</Link>to restore your connection at any time.',
  },

  errors: {
    nodeUnavailable: {
      title: 'Node Unavailable',
      description:
        "We're having trouble connecting to your Shinkai Node. Your node may be offline, or your internet connection may be down.",
    },
  },
  notifications: {
    messageReceived: {
      label: 'Message Received',
      description: 'You have received a response from {{inboxName}}',
    },
  },
};
