import React from 'react';
import { FlatList, ActivityIndicator, View} from 'react-native'
import { getCommandeAdmin } from '../../api/index'
import AdminItem from './adminItem'


class Admin extends React.Component {

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
            getCommandeAdmin().then(data => {
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
        this.props.navigation.navigate('adminDetail', { id_Commande : id_Commande , test: 'test'})
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
                    renderItem={({item}) => <AdminItem commande  = {item}  displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                />
                </View>
        )
    }
}

export default Admin