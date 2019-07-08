const functions = require('firebase-functions')
const admin = require('firebase-admin')
const logging = require('@google-cloud/logging')();
admin.initializeApp(functions.config().firebase);
const stripe = require('stripe')(functions.config().stripe.token)
const currency = functions.config().stripe.currency || 'USD';
// const stripe = require('stripe')('sk_test_7XYxlmmPOeQ5Wz9bq45zrrgT008CP2bKTo');
// const currency =  'USD';
const plaid = require('plaid');

// const plaidClientId = '5d223d7c4388c800137357b2';
// const plaidSecret = '74f4892a857f56f7da2848f24fa861';
// const plaidPublic = '0191f18378a953ad00740f00442117';
// const plaidEnv =  plaid.environments.sandbox;

const plaidClientId = functions.config().plaid.clientid || '5d223d7c4388c800137357b2';
const plaidSecret = functions.config().plaid.secret || '74f4892a857f56f7da2848f24fa861';
const plaidPublic = functions.config().plaid.publickey || '0191f18378a953ad00740f00442117';
const plaidEnv = functions.config().plaid.env || plaid.environments.sandbox;
const plaidClient = new plaid.Client(plaidClientId, plaidSecret, plaidPublic, plaidEnv);




exports.stripeCharge = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const email = context.auth.token.email || null;
  const source = data.source
  const amount = data.amount;
  const receipt_email = email;
  const customerId = data.customerId;
  let payment;
  if(source){
     payment = {
      token: source.token,
      amount
    };
  } else {
    payment = {
      amount
    }
  }
  
  let paymentId;
  try{
  //payment transaction
  const result = admin.database().ref(`/payments/${uid}`).push(payment)
    .once('value').then(snapshot => {
      paymentId = snapshot.key
      return snapshot.val();
    }).then(() => {
      let charge;
      if(source){
        charge = {
          amount,
          currency,
          source: source.token.id,
          receipt_email,
          customer: customerId
        };
      } else {
        charge = {
          amount,
          currency,
          receipt_email,
          customer: customerId
        };
      }
      const idempotency_key = paymentId //create a key
      return stripe.charges.create(charge, { idempotency_key })
        .then(charge => {
          admin.database()
            .ref(`/payments/${uid}/${paymentId}/charge`)
            .set(charge)
          return charge
        });
    });
  return result
  } catch(error){
    console.log(error);
    return reportError(error, {user: uid});
  }

});

exports.plaidBankToken = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const publicToken = data.token;
  const accountId = data.accountId
  try {
  const result = await plaidClient.exchangePublicToken(publicToken).then(res=>{
      const accessToken = res.access_token;
       return plaidClient.createStripeToken(accessToken, accountId);
    })
   return result;
  } catch(error){
    console.log(error);
    return reportError(error, {user: uid});
  }

});

exports.stripeCreateCustomer = functions.https.onCall(async (data, context) => {
  const tokenId = data.token;
  try{
   
  return  stripe.customers.create({
    source: tokenId,
    description: "Example customer"});
  } catch(error){
    console.log(error);
    return reportError(error, {user: uid});
  }

});

exports.getCustomerPayments = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  try {
    return admin.database().ref(`/customerPayments/${uid}`).once('value').then(snapshot => {
      console.log(snapshot.val());
      return snapshot.val();
    });
  } catch(error){
    console.log(error);
    return reportError(error, {user: uid});
  }
});

exports.saveCustomerPayment = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  console.log(data);
  const account =  data.account;
  const customerId = data.customerId;
  const payment = {
    account,
    customerId
  };
  try {
    return admin.database().ref(`/customerPayments/${uid}`).set(payment);
  } catch(error){
    console.log(error);
    return reportError(error, {user: uid});
  }
});


// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate users affected + send you email
// alerts, if you've opted into receiving them.
// [START reporterror]
function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = 'errors';
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: {function_name: process.env.FUNCTION_NAME},
    },
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function',
    },
    context: context,
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) {
       return reject(error);
      }
      return resolve();
    });
  });
}