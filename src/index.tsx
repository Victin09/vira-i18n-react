import React, { createContext, useContext, useEffect } from 'react';
import { I18n } from 'vira-i18n';

import { I18nContextProps, I18nProviderProps } from './types/i18n.types';

const I18Context = createContext<I18nContextProps>({
    language: '',
    locales: [],
    
    i18n: () => '',
    setLanguage: () => { },
});

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, language, locales }) => {
    const stateHook = React.useState(language);

    useEffect(() => {
        stateHook[1](language);
    }, [language]);

    const translator = new I18n(stateHook[0], locales);

    const i18n = (resourcesKey: string) => {
        return translator.i18n(resourcesKey);
    }

    return (
        <I18Context.Provider
            value={{
                language: stateHook[0],
                locales,
                i18n,
                setLanguage: stateHook[1],
            }}>
            {children}
        </I18Context.Provider>
    );
};

export function useI18n(language?: string) {
    const context = useContext(I18Context);

    if (language && language !== context.language) {
        return new I18n(language);
    }

    return context;
}

