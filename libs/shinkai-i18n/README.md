# Shinkai i18n

This package uses [i18next](https://react.i18next.com/) to translate all the shinkai apps. All the translations
are stored inside the [locales](locales) directory generated by [lobe-i18n](https://github.com/lobehub/lobe-cli-toolbox/blob/master/packages/lobe-i18n/README.md).

- `src/lib/default`: Contains translation files for the default development language (English). This is the source of truth for all translations, and all other languages are generated from this file.
- `locales`: Contains JSON translation files for all supported languages, with each language file containing the respective translation files generated by lobe-i18n.


## Implementation Walkthrough

### Add a new language support

To add new language i18n support in Shinkai (for example, adding Russian `vi-VN`), please follow the steps below:

1. Add the new language code in the i18n config file `i18nrc.js`

```js
module.exports = {
  // ... Other configurations

  outputLocales: [
    'en-US',
    'ja-JP',
    'ru-RU', // Add 'ru-RU' to the array
  ],
};
```

2. Run `npx nx i18n shinkai-i18n` to generate the translations for the new locale. Make sure you added your OPENAI_API_KEY in the `.env` file. 

### Add a new translation key

1. Add the new text to the [default translations file](./src/lib/default).
2. Run `npx nx i18n shinkai-i18n` to generate the new translations in the default locale (en-US.json) and then, will generate the translations for all other locales using lobe-i18n.

Note: If you want to remove translation keys, you can simply remove the key from the default translation file and run `npx nx generate-i18n shinkai-i18n` to remove the key from all other locales.

### Remove a i18n text

To remove, you just need to remove the code in which is being used, then run `npx nx generate-i18n shinkai-i18n` and it will take care of updating the all the locales.

## How to use

All texts within the app need to be rendered using the `t` function, returned by `useTranslation`:

```tsx
import { useTranslation } from '@shinkai_network/shinkai-i18n';

const Component: React.FC = () => {
  const { t } = useTranslation();

  return <>{t('componentName.textKey')}</>;
};
```

If a text contains HTML or JSX elements, then the `Trans` component can be used instead:

```tsx
import { useTranslation } from '@shinkai_network/shinkai-i18n';

const Component: React.FC = () => {
  const { Trans } = useTranslation();

  return <Trans i18nKey="componentName.textKey" components={{ Anchor: <a href="https://acme.com" /> }} />;
};
```

If a text needs to be accessed from outside of a component, then the `t` function exported by the
translation client can be used:

```tsx
import { t } from '@shinkai_network/shinkai-i18n';

const myFunction;
() => t('functionName.textKey');
```

Note that this should only be used in cases where we can't use `useTranslation`. The hook does extra
processing, hence why it is preferred in all other cases.