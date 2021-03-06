const line = require('@line/bot-sdk');
const crypt = require('crypto');
const dialogFlow = require('../service/dialogflow');

const lineConfig = {
  channelSecret: process.env.LINE_CHANNELSECRET,
  channelAccessToken: process.env.LINE_ACCESSTOKEN,
};

const lineClient = new line.Client({
  channelAccessToken: lineConfig.channelAccessToken,
});
// LINEへのレスポンス情報
const lambdaResponse = {
  statusCode: 200,
  headers: { 'X-Line-Status': 'OK' },
  body: '{"result":"connect check"}',
};

exports.assignService = (event) => {
  if (!event || !event.headers || !event.body) {
    console.log('No LINE');
    return false;
  }
  // CHANNELSECRETを秘密鍵として、event.body部をもとにHmacのハッシュ値を取得する。
  const signature = crypt
    .createHmac('sha256', lineConfig.channelSecret)
    .update(event.body)
    .digest('base64');
  console.log(signature);
  // LINEサーバから送られたHeaderの値を取得する。
  const header = (event.headers || {})['X-Line-Signature'];
  // headerの値と、取得したハッシュ値が一致した場合、受信先がLINEサーバであると判定する。
  return signature === header;
};

/**
 * AIサービスにぶん投げたあと、リプライする
 * @param {*} param クライアントから受信したイベント
 */
const execute = async (param) => {
  console.log('Start Line Promise');
  const result = await dialogFlow.postDialogFlow(param.message.text, param.source.userId);
  console.log(`DialogFlow result: ${result}`);
  if (result === null) {
    return;
  }
  const message = {
    type: 'text',
    text: result,
  };
  lineClient.replyMessage(param.replyToken, message);
};

/**
 * LINEメインサービス
 */
exports.main = (event, context) => {
  const body = JSON.parse(event.body);
  // ハッシュと、ヘッダの値を比較し、一致した場合のみ処理を行う。（一致した場合→LINEサーバかどうかの認証成功）
  if (body.events[0].replyToken === '00000000000000000000000000000000') {
    // LINE Developer画面で行える「接続確認」を押下した場合に通る
    console.log('接続確認');
    context.succeed(lambdaResponse);
    return;
  }
  body.events.forEach((params) => {
    console.log(`LINE Message Body: ${JSON.stringify(params, null, 4)}`);
    if (params.type !== 'message' || params.message.type !== 'text') {
      console.log('no message');
    }
    execute(params);
  });
};
