// 設定を.envからロード
// require("dotenv").config();
const line = require('@line/bot-sdk');
const crypt = require('crypto');
const dialogflow = require('dialogflow');

const lineConfig = {
  channelSecret: process.env.LINE_CHANNELSECRET,
  channelAccessToken: process.env.LINE_ACCESSTOKEN,
};

const lineClient = new line.Client({
  channelAccessToken: lineConfig.channelAccessToken,
});

const dialogflowConfig = {
  projectId: process.env.DIALOGFLOW_PROJECT_ID,
  serviceAccount: process.env.DIALOGFLOW_SERVICEACCOUNT,
  privateKey: process.env.DIALOGFLOW_PRIVATEKEY,
};

const dialogflowClient = new dialogflow.SessionsClient({
  project_id: dialogflowConfig.projectId,
  credentials: {
    client_email: dialogflowConfig.serviceAccount,
    private_key: dialogflowConfig.privateKey.replace(/\\n/g, '\n'),
  },
});

const verifySignature = (event) => {
  // CHANNELSECRETを秘密鍵として、event.body部をもとにHmacのハッシュ値を取得する。
  const signature = crypt
    .createHmac('sha256', lineConfig.channelSecret)
    .update(event.body)
    .digest('base64');
  // LINEサーバから送られたHeaderの値を取得する。
  const header = (event.headers || {})['X-Line-Signature'];
  return signature === header;
};

const postDialogFlow = (event) => {
  console.log('postDialogFlow');
  console.log(event);
  const request = {
    session: dialogflowClient.sessionPath(dialogflowConfig.projectId, event.source.userId),
    queryInput: {
      text: {
        text: event.message.text,
        languageCode: 'ja',
      },
    },
  };

  dialogflowClient
    .detectIntent(request)
    .then((responses) => {
      console.log('Detect Intent');
      const result = responses[0].queryResult;
      console.log(`Query: ${result.QueryText}`);
      console.log(`Response: ${result.fulfillmentText}`);
      if (!result.intent) {
        console.log('  No intent matched.');
        return;
      }
      console.log(`Intent: ${result.intent.displayName}`);
      console.log('LINE START');
      const message = {
        type: 'text',
        text: result.fulfillmentText,
      };
      lineClient.replyMessage(event.replyToken, message).then(() => {
        const lambdaResponse = {
          statusCode: 200,
          headers: { 'X-Line-Status': 'OK' },
          body: '{"result":"completed"}',
        };
        context.succeed(lambdaResponse);
      });
    })
    .catch((err) => {
      console.error('ERROR', err);
    });
};

exports.handler = (event, context) => {
  console.log(dialogflowConfig);
  if (!verifySignature(event)) {
    console.log('no signature');
    return;
  }

  const body = JSON.parse(event.body);
  // ハッシュと、ヘッダの値を比較し、一致した場合のみ処理を行う。（一致した場合→LINEサーバかどうかの認証成功）

  if (body.events[0].replyToken === '00000000000000000000000000000000') {
    // 接続確認エラー回避
    console.log('error kaihi');
    const lambdaResponse = {
      statusCode: 200,
      headers: { 'X-Line-Status': 'OK' },
      body: '{"result":"connect check"}',
    };
    context.succeed(lambdaResponse);
    return;
  }
  const eventsProcessed = [];

  body.events.forEach((params) => {
    if (params.type !== 'message' || params.message.type !== 'text') {
      console.log('no message');
      return;
    }
    eventsProcessed.push(postDialogFlow(params));
  });

  Promise.all(eventsProcessed).then((response) => {
    console.log(`${response.length} event(s) processed.`);
  });
};
