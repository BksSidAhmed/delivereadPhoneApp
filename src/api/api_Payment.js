// Post payment methode
export const postPaymentMethods = async (number, month, years, cvc) => {
    const url = 'http://192.168.1.23:3000/payment/createPaymentMethods'
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
    const url = 'http://192.168.1.23:3000/payment/createCustomers'
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
    const url = 'http://192.168.1.23:3000/payment/doSubscription'
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
export const getSubscription = async () => {
    console.log('test')
    const url = 'http://192.168.1.23:3000/payment/getSubscription/sub_I6yCttgjyoRcOG'
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