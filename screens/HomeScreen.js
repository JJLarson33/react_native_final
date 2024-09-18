import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import { auth, db } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Lists from '../components/Lists';
import { listObjects } from '../data/listObjects';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, ThemeProvider } from '../contexts/ThemeContext';

const HomeScreen = ({navigation}) => {
    console.log('home');   

    const logout = () => {
        signOut(auth).then(() => {          
            // Sign-out successful.
            navigation.navigate('Login');
        }).catch((error) => {
            // An error happened.
        });
    }

      onAuthStateChanged(auth, (user) => {
        if (user) {
            // logged in - stay here            
        } else {
            // not logged in            
            navigation.navigate('Login');
        }
    })

    const HomeHeader = () => {

        const th = useTheme();

        return (

            <ThemeProvider>
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: th.theme.backgroundColor, marginBottom: 15 }}>                    
                    <Text style={{ fontSize: 16, marginTop: 15, marginBottom: 15, color: th.theme.primary, alignSelf: 'center' }}>Nice to see you logged in, {auth.currentUser.email} !</Text>                        
                    <Button buttonStyle={{ backgroundColor:th.theme.body, width: 250, marginTop: 0, marginBottom: 5 }} onPress={() => logout()}>
                        <Text style={{ color: th.theme.backgroundColor, fontSize: 20, fontFamily: 'Georgia' }}>Sign Out</Text>
                    </Button>
                    <View style={{ marginBottom: 5 }}>
                        <MaterialCommunityIcons.Button name="theme-light-dark" size={25} color={th.theme.backgroundColor} backgroundColor={th.theme.body} borderRadius={25}                         
                        iconStyle={{ marginRight: 0 }} onPress={ () => th.toggleTheme(th.theme)} />
                    </View>                              
                </View>
            </ThemeProvider>
        )
    }

    return (   
        <ThemeProvider>
            <SafeAreaView>                
                <HomeHeader />                                
            </SafeAreaView>
            <Lists listObjects={listObjects} />
        </ThemeProvider>                      
    )    
}

export default HomeScreen;

const styles = StyleSheet.create({
    
});