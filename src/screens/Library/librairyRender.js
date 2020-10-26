import React  from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import MapView,{ Callout, Marker, Polygon } from 'react-native-maps';
import {postCmdIdBookRendu} from '../../api/index'

class LibrairyRender extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coordinates: [
                { name: 'Burger', latitude: 45.71699024700401, longitude: 4.843407763305314},
                { name: 'Pizza', latitude: 45.76999641784353, longitude: 4.786943822920238},
                { name: 'Soup', latitude: 45.79378281498758, longitude: 4.87780204171262},
                { name: 'Pizza', latitude: 45.76139883711983, longitude: 4.910476606199499},
                { name: 'Sushi', latitude: 45.74159936976883, longitude: 4.9067505593720195 },
                { name: 'Pizza', latitude: 45.72119257209988, longitude: 4.888406944221568},
              ]
          }
    }
    render() {      
        return (
            <View>
                <MapView
                    style = {{height : '100%'}}
                    initialRegion={{
                        latitude: 45.75,
                        longitude: 4.85,
                        latitudeDelta: 0.1500,
                        longitudeDelta: 0.1500,
                    }}>
                    <Polygon
                        coordinates={this.state.coordinates}
                        fillColor={'rgba(100, 100, 200, 0.3)'}
                        strokeWidth = {3}
                    />
                    <Marker 
                        draggable
                        coordinate = {{ latitude : 45.75, longitude : 4.85}}>
                        <Callout>
                                <Text>49 Rue Rachais, 69007 Lyon 7e Arrondissement, France</Text>  
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.7657977648948, longitude : 4.864617568323291}}>
                        <Callout>
                            <Text>38 Rue Sainte-Geneviève, 69001 Lyon, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.75439982807872, longitude : 4.8328028607966855}}>
                        <Callout>
                            <Text>52 Rue Sala, 69002 Lyon 2e Arrondissement, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.78139116847674, longitude : 4.838821859517961}}>
                        <Callout>
                            <Text>11b Rue Philippeville, 69004 Lyon, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.74719993147283, longitude : 4.878088660699484}}>
                        <Callout>
                            <Text>4 Rue Germain David, 69001 Lyon, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.73419776573572, longitude : 4.863471092376472}}>
                        <Callout>
                            <Text>62 Boulevard des États-Unis, 69008 Lyon 8e Arrondissement, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.74659989653634, longitude : 4.894425942942604}}>
                        <Callout>
                            <Text>Ancienne clinique mutualiste, Rue Trarieux, 69001 Lyon, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.72679517896272, longitude : 4.8545859037876715}}>
                        <Callout>
                            <Text>8 Rue Ludovic Bonin, 69200 Vénissieux, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.771795742161736, longitude : 4.809013484898208}}>
                        <Callout>
                            <Text>Fort de Vaise, Boulevard Antoine de Saint-Exupéry, 69009 Lyon, France</Text>
                        </Callout>
                    </Marker>
                    <Marker 
                        coordinate = {{ latitude : 45.733197472096194, longitude : 4.881528088540019}}>
                        <Callout>
                            <Text>Copropriété Califonie II, 28, 30, 32 Rue du Professeur Joseph Nicolas, 69008 Lyon, France</Text>
                        </Callout>
                    </Marker>
                </MapView>
               
            </View>
        )
    }
}

export default LibrairyRender