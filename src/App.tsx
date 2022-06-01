import './App.css';
import Amplify from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AccountLinkage } from './components/link/AccountLinkage';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return (
    <>
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App">
              <AccountLinkage></AccountLinkage>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>

    </>
  );
}

export default App;
