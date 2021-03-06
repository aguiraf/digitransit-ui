import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import ComponentUsageExample from './ComponentUsageExample';
import { setLanguage } from '../action/userPreferencesActions';

const selectLanguage = (executeAction, lang) =>
  () => executeAction(setLanguage, lang);

const language = (lang, currentLanguage, highlight, executeAction) => (
  <button
    id={`lang-${lang}`}
    key={lang}
    className={`${(highlight && 'selected') || ''} noborder lang`}
    onClick={selectLanguage(executeAction, lang)}
  >
    {lang}
  </button>
);

const LangSelect = ({ currentLanguage }, { executeAction, config }) => (
  <div key="lang-select" id="lang-select">
    {config.availableLanguages.map(lang =>
      language(lang, currentLanguage, lang === currentLanguage, executeAction),
    )}
  </div>
);

LangSelect.displayName = 'LangSelect';

LangSelect.description = () => (
  <div>
    <p>
      Language selection component, language selection comes from config.
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <LangSelect currentLanguage="en" />
      </div>
    </ComponentUsageExample>
  </div>);

LangSelect.propTypes = {
  currentLanguage: React.PropTypes.string.isRequired,
};

LangSelect.contextTypes = {
  executeAction: React.PropTypes.func.isRequired,
  config: React.PropTypes.object.isRequired,
};

const connected = connectToStores(LangSelect, ['PreferencesStore'], context => ({
  currentLanguage: context.getStore('PreferencesStore').getLanguage(),
}));

export { connected as default, LangSelect as Component };
