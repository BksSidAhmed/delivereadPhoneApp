import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import moment from 'moment'
import { getImage } from '../api/index'

class BooksItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
    render() {
        const book = this.props.book
        const { displayDetailForFilm } = this.props
        return (
          <TouchableOpacity 
              style={styles.main_container}  
              onPress={() => displayDetailForFilm(book.id_book)}>
            <StatusBar backgroundColor='#EF800B' barStyle="light-content"/>
              <Image
                style={styles.image}
                source={{uri: 'data:image/png;base64,' + book.image}}
              />
              <View style={styles.content_container}>
                <View style={styles.header_container}>
                  <Text style={styles.title_text} numberOfLines={2}>{book.titre}</Text>
                  <View style={[(book.id_commandebooks !== null) ? styles.circle_red: styles.circle_green]}></View>
                </View>
                <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={6}>{book.synopsys}</Text> 
                </View>
                <View style={styles.date_container}>
                  <Text style={styles.date_text}>Publication: {moment(new Date(book.dateSortie)).format('DD/MM/YYYY')}</Text>
                </View>
              </View>
          </TouchableOpacity>
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        height: 190,
        flexDirection: 'row',
      },
      image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
      },
      content_container: {
        flex: 1,
        margin: 5
      },
      header_container: {
        flex: 3,
        flexDirection: 'row'
      },
      title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
      },
      circle_green: {
        marginTop : 10,
        width: 15,
        height: 15,
        borderRadius: 150/2,
        backgroundColor: 'green'
      },
      circle_red: {
        marginTop : 10,
        width: 15,
        height: 15,
        borderRadius: 150/2,
        backgroundColor: 'red'
      },
      description_container: {
        flex: 7
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666'
      },
      date_container: {
        flex: 1
      },
      date_text: {
        textAlign: 'right',
        fontSize: 14
      }
    })

export default BooksItem