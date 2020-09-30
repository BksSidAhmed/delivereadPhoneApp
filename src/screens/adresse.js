import React from "react";
import {TouchableOpacity, StyleSheet} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class Adresse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adresse : ''
          }
    }
    render() {
        return (
            <TouchableOpacity style={styles.main_container}>
                <GooglePlacesAutocomplete
                                query={{
                                    key: 'AIzaSyAMUFhMmgYKe3xswa9XlgcEqfpFn1B7FT4',
                                    language: 'fr',
                                    components: 'country:fr'
                                }}
                                placeholder='Adresse de Livraison'
                                enablePoweredByContainer = {false}
                                fetchDetails = {false}
                                onPress={(data, details = null) => {                                    
                                    const adresse = data.description
                                    this.props.navigation.navigate('Reservation', { id_book : this.props.route.params.id_book})
                                    this.props.navigation.navigate('Reservation',  {adress : adresse })
                                }}              
                                styles={{
                                    textInputContainer: {
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0,
                                    },
                                    textInput: {
                                    marginLeft: 0,
                                    marginRight: 0,
                                    height: 38,
                                    color: '#5d5d5d',
                                    fontSize: 16,
                                    },
                                    predefinedPlacesDescription: {
                                    color: '#1faadb',
                                    },
                                }}
                            />
          </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex : 1,
    },
  })
export default Adresse