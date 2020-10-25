// Post payment methode
export const postPaymentMethods = async (number, month, years, cvc) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/payment/createPaymentMethods'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                number: number,
                month: month,
                years: years,
                cvc: cvc
            }),
        })
        return await response.json()      
    }catch(err){
        return console.error(err);
    }
}

// Post Customers
export const postCustomers = async (name, email, paymentMethod) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/payment/createCustomers'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                name: name,
                email: email,
                paymentMethod: paymentMethod,
            }),
        })
        return await response.json()      
    }catch(err){
        return console.error(err);
    }
}
// Post Subscription
export const postSubscription = async (customer, paymentMethod) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/payment/doSubscription'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                customer: customer,
                paymentMethod: paymentMethod,
            }),
        })
        return await response.json()      
    }catch(err){
        return console.error(err);
    }
}

// Get Subscription
export const getSubscription = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/payment/getSubscription/' + id
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        return await response.json()      
    }catch(err){
        return console.error(err);
    }
}
// Post Create Tokens
export const postCreateTokens = async (number, month, years, cvc) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/payment/createTokens'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                number: number,
                month: month,
                years: years,
                cvc: cvc
            }),
        })
        return await response.json()      
    }catch(err){
        return console.error(err);
    }
}