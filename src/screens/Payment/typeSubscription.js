import React from 'react'
import { Text, View, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

class TypeSubscription extends React.Component { 
    _paye = () => {
        this.props.navigation.navigate('Subscription', { id_book : this.props.route.params.id_book})
    }
    render(){
        return(
            <View style = {styles.main_containers}>
                <View style= { styles.container_text_title }>
                    <Text style = {styles.text_title}>Qu'elles Abonnements Souhaitez-vous choisir ?</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => {this._paye()}}
                    disabled = {false}
                    style= { styles.container_abonnement_standard }>
                    <View style = {styles.container_prix}>
                        <Text style = {{fontSize: 15}}>Abonnement Standard</Text>
                        <Text style = {styles.text_prix}>16.99 €</Text>
                    </View>
                    <View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="check" color="green" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Accèder à tout les livres Deliveread </Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="times" color="red" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Un livreur pour rendre son livre</Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="times" color="red" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Electro Book</Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="times" color="red" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Achat de livre avec 10% de réduction</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled = {true}
                    style= { styles.container_abonnement_autre }>
                    <View style = {styles.container_prix}>
                        <Text style = {{fontSize: 15}}>Abonnement Premium : BIENTOT DISPO.</Text>
                        <Text style = {styles.text_prix}>21.99 €</Text>
                    </View>
                    <View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="check" color="green" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Accèder à tout les livres Deliveread </Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="check" color="green" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Un livreur pour rendre son livre</Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="check" color="green" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Electro Book</Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="check" color="green" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Achat de livre avec 5% de réduction</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled = {true}
                    style= { styles.container_abonnement_autre }>
                        <View style = {styles.container_prix}>
                            <Text style = {{fontSize: 15}}>Abonnement Etudiant : BIENTOT DISPO.</Text>
                            <Text style = {styles.text_prix}>12.99 €</Text>
                        </View>
                        <View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="check" color="green" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Accèder à tout les livres Deliveread </Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="times" color="red" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Un livreur pour rendre son livre</Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="times" color="red" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Electro Book</Text>
                            </View>
                        </View>
                        <View style = {styles.container_possibility}>
                            <View style = {{margin :5, marginLeft : 10}}>
                                <FontAwesome5 name="times" color="red" size= {20}></FontAwesome5>
                            </View>
                            <View style = {{margin :5}}>
                                <Text style = {{fontSize: 15}}>Achat de livre avec 5% de réduction</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_containers : {
        flex : 1
    },
    container_text_title:{ 
        flex : 0.10,
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
        margin : 5
    },
    container_abonnement_standard:{ 
        flex : 1,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.80,
        elevation: 5,
        borderRadius: 3,
        margin : 5
    },
    container_abonnement_autre:{ 
        flex : 1,
        backgroundColor: "#BAB8B8",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.80,
        elevation: 5,
        borderRadius: 3,
        margin : 5
    },
    text_title : {
        textAlign:'center',
        fontSize: 15,
        fontWeight : 'bold'
    },
    text_prix : {
        flex : 1,
        textAlign: 'right',
        fontSize: 15,
        fontWeight : 'bold'
    },
    container_prix : {
        margin : 7,
        flexDirection : 'row',
        borderBottomWidth : 1
    },
    container_possibility : {
        flexDirection : 'row',
    }
})

export default TypeSubscription
