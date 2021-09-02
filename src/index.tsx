import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18n } from 'vira-i18n';

import { I18nContextProps, I18nProviderProps } from './types/i18n.types';

const I18Context = createContext<I18nContextProps>({
    language: '',
    locales: [],
    
    i18n: () => '',
    setLanguage: () => {},
});

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, language, locales }) => {
    const [lang, setLang] = useState(language);

    useEffect(() => {
        setLang(language);
    }, [language]);

    const translator = new I18n(lang, locales);

    const i18n = (resourcesKey: string) => {
        return translator.i18n(resourcesKey);
    }

    const setLanguage = (language: string) => {
        setLang(language);
    }

    return (
        <I18Context.Provider
            value={{
                language: lang,
                locales,
                i18n,
                setLanguage,
            }}>
            {children}
        </I18Context.Provider>
    );
};

export const useI18n = (): I18nContextProps => {
    const context = useContext(I18Context);

    if (context === undefined)
        throw new Error('I18n context is undefined');
        
    return context;
}

