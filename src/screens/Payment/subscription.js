import React from 'react'
import { Text, View, StyleSheet, ScrollView, Button,ActivityIndicator} from 'react-native';
import { postPaymentMethods, postCustomers, postSubscription, postCreateTokens} from '../../api/api_Payment'
import { postIdAbonnement, getUserByIdUser, postTokenAB} from '../../api/index'
import { CreditCardInput} from "react-native-credit-card-input";
import { connect } from 'react-redux'
import { Root, Popup } from 'popup-ui';

class Subscription extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            cardData : "",
            dataUser : "",
            isVisible : false, 
            loading : false
        }
    }

    UNSAFE_componentWillMount(){
        getUserByIdUser(this.props.idUser).then(data => {
            this.setState({
                dataUser : data.user[0],
                paymentMethods : '',
                customer : '',
            })
        })
     }

    _subscribe () {
        let number = this.state.cardData.values['number'].replace(/ /g, '')
        let month = this.state.cardData.values['expiry'].split('/')[0]
        let years = this.state.cardData.values['expiry'].split('/')[1]
        let cvc = this.state.cardData.values['cvc']
        let name = this.state.cardData.values['name']
        this.setState({
            loading: true,
        })
        postCreateTokens(number,month,years,cvc).then(data => {
            postTokenAB(this.props.idUser,data.id).then(data => {
            })
        })
        postPaymentMethods(number,month,years,cvc).then(data => {
            this.setState({
                paymentMethods : data.id
            })
            postCustomers(name,this.state.dataUser.email, this.state.paymentMethods).then(data => {
                this.setState({
                    customer : data.id
                })
                    postSubscription(this.state.customer, this.state.paymentMethods).then(data => {
                        postIdAbonnement(this.props.idUser,data.id).then(data => {
                        })
                        this.props.navigation.navigate('Adresse', { id_book : this.props.route.params.id_book})
                        this.setState({
                            isVisible: false,
                            loading : false
                        })
                    })
            })
        })
    }

    payement(){
        Popup.show({
            type: 'Success',
            title: "Abonnement",
            textBody: "Souhaitez vous souscrire à cette abonnement ? ",
            button: true,
            buttonText: 'Ok',
            callback: () =>  this._subscribe()
        }) 
    }
    
    render(){
        if(this.state.loading) {
            return(
                <View style={{flex: 1,justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        return(
            <Root>
            <ScrollView style = {styles.main_containers}>
                    <View style= { styles.container_text }>
                        <Text style = {styles.text_subscribe}>Abonnement à 16.99€/mois </Text>
                    </View>
                <CreditCardInput 
                requiresName onChange={(cardData) => this.setState({ cardData })} 
                />
                <View style= {{margin : 20}}>
                    <Button
                        title='Subscribe'
                        disabled={!this.state.cardData.valid}
                        onPress={() => {this.payement()}}
                    />
                </View>
            </ScrollView>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    main_containers : {
        flex : 1
    },
    container_text:{ 
        flex : 0.25,
        backgroundColor: "#FFF",
        paddingVertical: 20,
        marginVertical: 2,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.80,
        elevation: 5,
        borderRadius: 3,
        marginBottom : 10
    },
    text_subscribe : {
        textAlign:'center',
        fontSize: 20,
    },
})
const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       idUser: state.idUserReducer.idUser,
       idAbonnement: state.idAbonementReducer.idAbonnement
   }
}
export default connect(mapStateToProps)(Subscription)
