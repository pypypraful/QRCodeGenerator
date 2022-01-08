import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {configureStore} from "./store/initialStore";
import App from './App';
import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import {COGNITO} from "./configs/aws";

Auth.configure({
    aws_cognito_region: COGNITO.REGION,
    aws_user_pools_id: COGNITO.USER_POOL_ID,
    aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

const API_ID = ""

API.configure({
    endpoints: [
        {
            name: 'Inventory',
            endpoint: `https://${API_ID}.execute-api.ap-south-1.amazonaws.com/Prod`,
            custom_header: async () => {
                return {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                };
            },
        },
    ],
});

const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
