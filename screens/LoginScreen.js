import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../lib/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, ThemeProvider } from '../contexts/ThemeContext';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
                
    console.log('login screen');
    //console.log('auth = ' + JSON.stringify(auth));      
    
    const register = () => {
        console.log("registering");
        console.log(email);
        navigation.navigate('Register');                
    }

    const reset = () => {
        console.log("reset");
        setEmail('');
        setPassword('');
    }

    onAuthStateChanged(auth, (user) => {            
        if (user) {
            //console.log('auth = ' + JSON.stringify(auth));
            //console.log('user = ' + JSON.stringify(user));
            // is signed in
            navigation.navigate('Home');
            console.log('Logged In');
        } else {
            // not logged in
            navigation.navigate('Login');
        }
    })

    const login = (email, password, nav) => {   
        console.log(email);
        console.log(password);
        //login to firebase            
        console.log(JSON.stringify(auth));            
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('WHAT' + JSON.stringify(userCredential));
            // Signed in 
            const user = userCredential.user;
            if (!user.emailVerified) {                    
                navigation.navigate('ReVerify');
            }
            else {
                console.log("SUCCESS" + JSON.stringify(user));
            }                                
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("ERROR:" + error.message);
            alert(error.message);
        });

    }
    
    const LoginHeader = () => {

        const th = useTheme();       

        return (
            <ThemeProvider>
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: th.theme.backgroundColor, marginBottom: 15 }}>                                        
                    <Text style={{ fontSize: 20, color: th.theme.primary, marginBottom: 40 }}>This requires a registered user to use this part of the app.</Text>
                    <Text style={{ fontSize: 16, color: th.theme.primary, marginBottom: 40 }}>Please login below.</Text>                                        
                </View>                                     
            </ThemeProvider>                                       
        )
    }
    
    const LoginFooter = () => {

        const th = useTheme();

        return (
            <ThemeProvider>
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: th.theme.backgroundColor, paddingTop: 20 }}>
                    <Button buttonStyle={{ backgroundColor:th.theme.body, width: 250, marginBottom: 10 }} onPress={() => login(email, password, navigation)}>
                        <Text style={{ color: th.theme.backgroundColor, fontSize: 20, fontFamily: 'Georgia' }}>Sign In</Text>                    
                    </Button>
                    <View style={{ marginBottom: 5 }}>
                        <MaterialCommunityIcons.Button name="theme-light-dark" size={25} color={th.theme.backgroundColor} backgroundColor={th.theme.body} borderRadius={25}                         
                        iconStyle={{ marginRight: 0 }} onPress={ () => th.toggleTheme(th.theme)} />
                    </View>
                    <Text style={{ fontSize: 16, marginBottom: 15, color: th.theme.primary, alignSelf: 'center' }} onPress={register}>Don't have a login? Register now!</Text>                       
                    <Text style={{ fontSize: 16, marginBottom: 15, color: th.theme.primary, alignSelf: 'center' }} onPress={reset}>Clear Input Boxes</Text>
                </View>
            </ThemeProvider>
        )
    }
       
    return (   
        <ThemeProvider>
            <SafeAreaView>                
                <LoginHeader />
                <Input
                        placeholder='Enter your email'
                        label='Email'
                        leftIcon={{ type: 'material', name: 'email' }}
                        autoCapitalize = 'none'
                        value={email}
                        onChangeText={text=> setEmail(text)}
                    />
                    <Input
                        placeholder='Enter your password'
                        label='Password'
                        leftIcon={{ type: 'material', name: 'lock' }}
                        autoCapitalize= 'none'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                <LoginFooter />
            </SafeAreaView>
        </ThemeProvider>                      
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    
});