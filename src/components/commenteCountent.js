import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { Card } from 'react-native-paper'
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux'
import { getUserByIdUser } from '../api/index'

class CommenteCountent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        nomUser : ''
    }
  }
    componentWillMount(){
        getUserByIdUser(this.props.idUser).then(data => {
           this.setState({
               nomUser : data.user[0].login
           })
        })
    }
    render() {
        const commentes = this.props.commentes
        console.log(commentes)
        return (
                <Card style={styles.main_container}>
                    <View style = {{alignItems:'flex-end'}}>                    
                        <View style = {{width : 70, margin : 20,}}>
                            <StarRating
                                disabled={true}
                                fullStarColor = {'#E1D706'}
                                starSize = {10}
                                spacing={4}
                                maxStars={5}
                                rating={commentes.note}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>

                    </View>
                    <View style = {{margin : 5, flex :1, backgroundColor : '#E5E5E4', borderRadius : 5}}>
                        <Text style = {{fontSize : 18, margin : 5,}} numberOfLines={6}>{commentes.commentaire}</Text>
                    </View>
                </Card>
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        flex : 1,
        marginTop : 20,
        height : 200
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

const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
      idUser: state.idUserReducer.idUser,
   }
  }
  export default connect(mapStateToProps) (CommenteCountent)