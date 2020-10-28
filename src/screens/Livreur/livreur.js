import React from 'react';
import { FlatList, ActivityIndicator, View} from 'react-native'
import { getCommande } from '../../api/index'
import CommandesItem from './commandesItem'
import { connect } from 'react-redux'

class Livreur extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Commandes: [],
            loading : false
        }
        this._setData()
    }
        _setData = async () => {            
        this.setState({ 
            loading : true
        })
          try {
            getCommande(this.props.idUser).then(data => {
                this.setState({ 
                    loading : false,
                    Commandes: data.book,
                    // loading : false
                })
            })
          } catch (err) {
            console.log(err);
          }
    };

    _displayDetailForFilm = (id_Commande) => {
        this.props.navigation.navigate('commandeDetail', { id_Commande : id_Commande , test: 'test'})
    }

    render() {
        if(this.state.loading) {
            return(
                <View style={{flex: 1,justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#00ff00" />
              
                </View>
            )
        }
    
        return (
            <View>
                <FlatList
                    data={this.state.Commandes}
                    keyExtractor={(item) =>item.id_Commande.toString()}
                    renderItem={({item}) => <CommandesItem commande  = {item}  displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       idUser : state.idUserReducer.idUser
   }
}

export default connect(mapStateToProps) (Livreur)