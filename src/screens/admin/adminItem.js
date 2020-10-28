import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import moment from 'moment'
import { getImage } from '../../api/index'

class AdminItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
    render() {
        const commande = this.props.commande
        const { displayDetailForFilm } = this.props
        return (
          <TouchableOpacity 
              style={styles.main_container}  
              onPress={() => displayDetailForFilm(commande.id_Commande)}
            >
            <StatusBar backgroundColor='#EF800B' barStyle="light-content"/>
              <Image
                style={styles.image}
                source={{uri: 'data:image/png;base64,' + commande.image}}
              />
              <View style={styles.content_container}>
                <View style={styles.header_container}>
                  <Text style={styles.title_text} numberOfLines={2}>{ commande.titre}</Text>
                  <View style={[(commande.id_Commande !== null) ? styles.circle_red: styles.circle_green]}></View>
                </View>
                <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={3}>{ commande.adresse}</Text> 
                
                </View>
                <View style={{justifyContent:"flex-end"}}>
                <Text style={styles.date_text}> {moment(new Date( commande.date_livraison)).format('DD/MM/YYYY, h:mm:ss ')}</Text>
                </View>
              </View>
          </TouchableOpacity>
      
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        height: 160,
        flexDirection: 'row',
        borderWidth: 1,
        margin : 5,
        borderColor: 'black'
      },
      image: {
        width: 100,
        height: 150,
        margin: 5,
        backgroundColor: 'gray'
      },
      content_container: {
        flex: 1,
        
      },
      header_container: {
        flex: 3,
        flexDirection: 'row'
      },
      title_text: {
      
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
      },
      description_container: {
        flex: 5
      },
      description_text: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666666',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      date_container: {
        flex: 1
      },
      date_text: {
        textAlign: 'right',
        fontSize: 14,
        justifyContent: 'flex-end'
        
      }
    })

export default AdminItem