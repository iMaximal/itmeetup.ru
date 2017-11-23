/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Footer from './../../components/Footer';

import EventsPage from './../../components/Events/EventsPage';
import StaticPage from './../../components/Events/StaticPage';
import ErrorPage from './../../components/Events/ErrorPage';
import Splash from './../../components/Events/Splash';
import theme from './../../theme';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - IT Meet ups in Russia"
        defaultTitle="ItMeetUp.ru"
      >
        <meta name="description" content="A IT Meet Up in Russia" />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/"
          component={EventsPage}
        />
        <Route
          exact
          path="/p(age)?/:page"
          component={StaticPage}
        />
        <Route
          exact
          path="/workshop"
          component={() =>
            (<div>
              <Splash
                backgroundColor={theme.secondary}
                page="WORKSHOP"
              />
            </div>)
          }
        />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
