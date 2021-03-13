import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from './components/Sidebar';
import styled from "styled-components";
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" alt="" />

          <Spinner
            className="spinner"
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <Header />
              <AppBody>
                <Sidebar />
                <Switch>
                  <Route path="/" exact>
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  > img {
    height: 100px;
    width: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }

  > .spinner {
    margin: 0 auto;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
