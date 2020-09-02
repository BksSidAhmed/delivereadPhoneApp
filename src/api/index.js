// Get all Books
export const getBooks = async () => {
    const url = 'http://192.168.1.23:3000/api/books'
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        
        //console.log(await response.json())
        return await response.json()      
    }catch(err){
        return console.error(err);
    }
}

// Get Books with id
export const getBooksid = async (id) => {
    const url = 'http://192.168.1.23:3000/api/books/' + id
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
// Get Books with idUser
export const getBooksIdUser = async (id) => {
    const url = 'http://192.168.1.23:3000/api/booksUser/' + id
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
// Get commande with idUser
export const getCommandeIdUser = async (id) => {
    const url = 'http://192.168.1.23:3000/api/commande/' + id
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
//get user with idUser
export const getUserByIdUser = async (id) => {
    const url = 'http:/192.168.1.23:3000/api/user/' + id
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
// Post New data user
export const postNewDataUser = async (textChamp , valDataUser ,id) => {
    const url = 'http:/192.168.1.23:3000/api/user/' + textChamp + '/'+id
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                valDataUser
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}

// Post User Login
export const postUser = async (login , mdp) => {
    const url = 'http://192.168.1.23:3000/api/login/'
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                login,
                mdp
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}

// Post User Register
export const postUserRegister = async (prenom,nom,login,mdp,telephone,email) => {
    const url = 'http://192.168.1.23:3000/api/sign-up/'
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                login,
                mdp,
                prenom,
                nom,
                telephone,
                email
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
// Post User commande
export const postCommandeBook = async (datelivraison , adresselivraison, id_user, id) => {
    const url = 'http://192.168.1.23:3000/api/commandeBooks/' + id
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                datelivraison,
                adresselivraison, 
                id_user
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
export const postCommandeBookid = async (idcommandeBooks, id) => {
    const url = 'http://192.168.1.23:3000/api/commandeBooksid/' + id
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                idcommandeBooks
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
// Get token
export const getToken = async (token) => {
    const url = 'http://192.168.1.23:3000/api/secret-route/'
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' :  'Bearer ' + token
            }
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
// Send star note
export const postStar = async (commentaire, note , id_user ,id_book) => {
    const url = 'http://192.168.1.23:3000/api/starUser'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                commentaire,
                note,
                id_user,
                id_book
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}

// Get all commentaire value
export const getStar = async (id_user,id_book) => {
    const url = 'http://192.168.1.23:3000/api/commentaire/' + id_user + '/' + id_book
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
export const getStatStar = async (id_book) => {
    const url = 'http://192.168.1.23:3000/api/statStar/' + id_book
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
export const getStatStarUser = async (id_book) => {
    const url = 'http://192.168.1.23:3000/api/statStarUser/' + id_book
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
export const getCommentaireAll = async (id_book) => {
    const url = 'http://192.168.1.23:3000/api/commentaireAll/' + id_book
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}