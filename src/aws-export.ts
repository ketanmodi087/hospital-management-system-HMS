// DEV
const apiSetting = {
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_DEV_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_DEV_WEB_CLIENT_ID,
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_DEV_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.REACT_APP_AWS_APPSYNC_REGION,
  aws_appsync_authenticationType: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATION_TYPE,
  aws_appsync_apiKey: null,
  // authenticationFlowType: process.env.REACT_APP_AUTHENTICATION_FLOW_TYPE,
  mandatorySignIn: true,
  federationTarget: process.env.REACT_APP_FEDERATION_TARGET,
};

export { apiSetting };
