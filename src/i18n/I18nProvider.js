import React from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'
import '@formatjs/intl-getcanonicallocales/polyfill';
import { getLocalizationMessage } from 'redux/helper';

export const defaultMessages = {
  en: require('i18n/messages/en'),
  ar: require('i18n/messages/ar')
}

export default function I18nProvider({ children }) {
  let locale = useSelector(({ Auth }) => Auth.subLang);
  const { getAppLanguageList } = useSelector(({ Auth }) => Auth);
  let newMessages = {};
  if(!defaultMessages[locale]){
    newMessages = getLocalizationMessage(getAppLanguageList, locale);
  }
  let allMessages = {...defaultMessages};
  if(Object.keys(newMessages).length > 0){
    allMessages = {...allMessages, ...newMessages};
  }
  if(!allMessages[locale]){
    locale = "en";
  }
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
