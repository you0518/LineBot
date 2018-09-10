const index = require('./index.js');

const event = {
  resource: '/hotateFunc',
  path: '/hotateFunc',
  httpMethod: 'POST',
  headers: {
    Accept: '*/*',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'JP',
    'Content-Type': 'application/json;charset=UTF-8',
    Host: '4jdp5h63t2.execute-api.ap-northeast-1.amazonaws.com',
    'User-Agent': 'LineBotWebhook/1.0',
    Via: '1.1 178a96b32b70ebacd2b7ef5ba2a3dfab.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'gPSG-cxfo7w0m2tSFNzV0fqM3EXNuSFXGWot3LU-d8XbZtG93feTkQ==',
    'X-Amzn-Trace-Id': 'Root=1-5b962bdc-74bc1d54f2c36b90ca3a682c',
    'X-Forwarded-For': '203.104.146.154, 52.46.54.115',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
    'X-Line-Signature': 'Y9j5pWlIacQjENKNj/q016A5vjw4dD5RRJ0F3Me4LEU=',
  },
  multiValueHeaders: {
    Accept: ['*/*'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-Country': ['JP'],
    'Content-Type': ['application/json;charset=UTF-8'],
    Host: ['4jdp5h63t2.execute-api.ap-northeast-1.amazonaws.com'],
    'User-Agent': ['LineBotWebhook/1.0'],
    Via: ['1.1 178a96b32b70ebacd2b7ef5ba2a3dfab.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['gPSG-cxfo7w0m2tSFNzV0fqM3EXNuSFXGWot3LU-d8XbZtG93feTkQ=='],
    'X-Amzn-Trace-Id': ['Root=1-5b962bdc-74bc1d54f2c36b90ca3a682c'],
    'X-Forwarded-For': ['203.104.146.154, 52.46.54.115'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
    'X-Line-Signature': ['Y9j5pWlIacQjENKNj/q016A5vjw4dD5RRJ0F3Me4LEU='],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: 'm4ogpi',
    resourcePath: '/hotateFunc',
    httpMethod: 'POST',
    extendedRequestId: 'M_vKZHaetjMFkQw=',
    requestTime: '10/Sep/2018:08:31:24 +0000',
    path: '/hotateAPI/hotateFunc',
    accountId: '105811380980',
    protocol: 'HTTP/1.1',
    stage: 'hotateAPI',
    requestTimeEpoch: 1536568284111,
    requestId: 'e6fb067c-b4d3-11e8-8cb8-850537cb5e51',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '203.104.146.154',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'LineBotWebhook/1.0',
      user: null,
    },
    apiId: '4jdp5h63t2',
  },
  body:
    '{"events":[{"type":"follow","replyToken":"14d95b99776844ab9837ab0c2c5de23f","source":{"userId":"U7d6eb3fca65d630887e0023f9a7ba364","type":"user"},"timestamp":1536568284055}]}',
  isBase64Encoded: false,
};
const context = { value: 'context' };
index.handler(event, context);
