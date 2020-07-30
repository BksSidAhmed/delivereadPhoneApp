// ./permission/readPhoneState.js

// Dependance React
import {PermissionsAndroid} from 'react-native';

export const requestACCESSFINELOCATIONPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permission",
          message:
            "Deliveread à besoin d'acceder a vos donnée de localisation " +
            "Afin de vous livrer dans les meilleurs delai",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
          
      }
    }catch (err) {
      console.warn(err);
    }
};