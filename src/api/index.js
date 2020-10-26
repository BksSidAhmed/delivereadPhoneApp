// Get all Books
export const getBooks = async () => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/books'
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

//Get all New Commande 
export const getCommande = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandes/'+id
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

//Get all New Commande for admin 
export const getCommandeAdmin = async () => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeAdmin'
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

//je choisie cette commande puor le livreur
export const postCmdIdLivreur = async (idLivreur, idcommande , valDataUser) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeOfLivreur/'+ idLivreur + '/' + idcommande
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

//je choisie cette commande puor le livreur
export const postCmdIdLivreurClient = async (idLivreur, idcommande , valDataUser) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeOfLivreurClient/'+ idLivreur + '/' + idcommande
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

//je choisie cette commande puor le livreur
export const postCmdIdAdmin = async (idcommande) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeOfAdmin/' + idcommande
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])

    }catch(err){
        return console.error(err);
    }
}

//je choisie cette commande puor le livreur
export const postCmdIdBookRendu = async (idcommande) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeOfBookRendu/' + idcommande
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])

    }catch(err){
        return console.error(err);
    }
}

// Get all BooksSearch
export const getBookSearch = async (text) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/bookSearch/' + text
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
// Get Books with id
export const getBooksid = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/books/' + id
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/booksUser/' + id
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
export const getCommandeIdUser = async (reference, id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commande/' + reference+'/' +id
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/user/' + id
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
// Get commande  user et books with idcommande
export const getCmdUserbooksIdCmd = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/cmdCliUser/' + id
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/user/' + textChamp + '/'+id
    
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/login/'
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/sign-up/'
    
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeBooks/' + id
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commandeBooksid/' + id
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/secret-route/'
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/starUser'
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commentaire/' + id_user + '/' + id_book
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/statStar/' + id_book
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/statStarUser/' + id_book
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
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/commentaireAll/' + id_book
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
                                                ////USER
//POST 
// Post NbBookCommandepostplus
export const postNbBookCommandePlus = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/nbBookCommandepostplus/' + id
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}
// Post NbBookCommandepostmoins
export const postNbBookCommandeMoins = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/nbBookCommandepostmoins/' + id
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}

//GET
//get NbBookCommandeget
export const getNbBookCommande = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/nbBookCommandeget/' + id
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
                                                ////ABONNEMENT
//POST
// Post id Abonnement
export const postIdAbonnement = async (id, idAbonnement) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/userAbonnementpost/' + id
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                idAbonnement,
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}

// Post Token
export const postTokenAB = async (id, tokenAbonnement) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/userTokenABPost/' + id
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                tokenAbonnement,
            }),
        })
        const statusCode = response.status
        return await Promise.all([statusCode,response.json()])
        
    }catch(err){
        return console.error(err);
    }
}


//get id Abonnement
export const getIdAbonnement = async (id) => {
    const url = 'https://jonathanjouffroy.alwaysdata.net/api/userAbonnementget/' + id
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