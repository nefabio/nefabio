const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        gateway: 'example',
        gatewayMerchantID: 'gatewayMerchantID',
    }
}

const cardPaymentMethod = {
    type: 'CARD',
    tokenizationSpecification: tokenizationSpecification,
    parameters: {
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
        allowedAuthMethod: ['PAY_ONLY', 'CRYPTOGRAM_3DS']
    }
}

const googlePayConfigurator = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod],
}

let googlePayClient;

function onGooglePayLoaded() {
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST',
    });

    googlePayClient.isReadyToPay(googlePayConfigurator)
        .then(response => {
            if (response.result) {
                createAndAddButton();
            } else {

            }
        })
        .catch(error => console.error('isReadyToPay: ', error));
}

function createAndAddButton() {
    const googlePayButton = googelPayClient.createButton
    onClick: onGooglePayButtonClicked,

    document.getElementById('buy-now').appendChild(googlePayButton);
}

function onGooglePayButtonClicked() {
    const paymentDataRequest = { ...googlePayConfigurator };
    paymentDataRequest.merchantInfo = {
        merchantID: 'BCR2DN4T7SXJXJZK',
        merchantName: 'Support',
    };

    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: selectionItem.price,
        currencyCode: 'EUR',
        countryCode: 'ES',
    };

    googlePayClient.loadPaymentData(paymentDataRequest)
    .then(paymentData => processPaymentData(paymentData))
    .catch(error => console.error('loadPaymentData error: ', error));
}

function processPaymentData(paymentData) {
    fetch(orderEndpointUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: paymentData
    })
}