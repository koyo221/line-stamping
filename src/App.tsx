import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { AccountLinkage } from './components/link/AccountLinkage';
import { Authenticator } from '@aws-amplify/ui-react';
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsExports from "./aws-exports";

I18n.putVocabularies(translations);
I18n.setLanguage('ja');

Amplify.configure(awsExports);

function App() {
  return (
    <>
      <Authenticator
        hideSignUp={true}
        className="pt-20"
        >
        {({ signOut, user }) => (
          <div className="App">
              <AccountLinkage username={user?.username} accessToken={user?.getSignInUserSession()?.getIdToken().getJwtToken()} signOut={signOut}></AccountLinkage>
          </div>
        )}
      </Authenticator>

    </>
  );
}

export default App;
