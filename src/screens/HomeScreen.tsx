import React, { useEffect, useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Auth } from '../services';
import HomeCard from '../components/HomeCard';
import Background from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice'; // Acciones de Redux
import auth from '@react-native-firebase/auth';
import { BackHandler } from 'react-native';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogOut = async () => {
    try {
      await Auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user); // Obtener el usuario del store

  // Bloquea el boton de Hardware para ir para atras
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; // Retornar true bloquea el botón de retroceso
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        dispatch(clearUser());
      }
    });
    return subscriber;
  }, [dispatch]);
  
  return (
    <Background>
      <HomeCard userName={user?.displayName || 'Usuario'} handleLogOut={handleLogOut}/>
    </Background>
  );
};

export default HomeScreen;
