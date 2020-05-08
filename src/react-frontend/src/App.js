// Copyright 2017 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
//     http://aws.amazon.com/apache2.0/
//  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

import React from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import {AmplifyAuthenticator, AmplifySignOut, AmplifySignUp} from '@aws-amplify/ui-react';
import {Grid, Menu, Header} from 'semantic-ui-react'

import '@aws-amplify/ui/dist/style.css';

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import {NewAlbum, AlbumList} from './components/Album'
import {AlbumDetails} from "./components/AlbumDetail";

Amplify.configure(aws_exports);

function App() {
  return (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          {
            type: "username",
            label: "Username *",
            placeholder: "Username",
            required: true,
          },
          {
            type: "email",
            label: "Email *",
            placeholder: "Email",
            required: true,
          },
          {
            type: "password",
            label: "Password *",
            placeholder: "Password",
            required: true,
          },
        ]}

      ></AmplifySignUp>

      <Router>
        <Menu inverted attached>
          <Menu.Item
            name='home'>
            <NavLink to='/'><Header color="yellow">Albums</Header></NavLink>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <AmplifySignOut/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Grid padded>
          <Grid.Column>

            <Route path="/" exact component={NewAlbum}/>
            <Route path="/" exact component={AlbumList}/>
            <Route
              path="/albums/:albumId"
              render={props => <AlbumDetails id={props.match.params.albumId}/>}/>
          </Grid.Column>
        </Grid>
      </Router>
    </AmplifyAuthenticator>
  );
}


export default App;