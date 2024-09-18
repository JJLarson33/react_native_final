import React, { useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

const RegisterScreen = ({navigation}) => {    

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    
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
            // is signed in
            navigation.navigate('Home');            
        } else {
            // not logged in
            navigation.navigate('Register');
        }
    })
    const verifyEmail = (auth, (user) => {        
        sendEmailVerification(user)
        .then(() => {
            console.log('verification email sent');
            alert('Verification email sent.');
            // Verification email sent.
            logout();
            navigation.navigate('Login');
        })
        .catch(function(error) {
            // Error occurred. Inspect error.code.
        });
    })

    const register = (email, password1, password2) => { 
        
        if (password1 === password2)
        {                        
            createUserWithEmailAndPassword(auth, email, password2)
            .then((userCredential) => {
                console.log('Password matches');
                // Signed up 
                const user = userCredential.user;
                verifyEmail(user);                                
            })  
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error.message);
                // ..
            });

        } else {
            alert('Password doesn\'t match');
        }                
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.heading}>Register</Text>
                <Input
                        placeholder='Enter your email'
                        label='Email'
                        leftIcon={{ type: 'material', name: 'email' }}
                        autoCapitalize = 'none'
                        value={email}
                        onChangeText={text=> setEmail(text)}
                    />
                    <Input
                        placeholder='Create your password'
                        label='Password'
                        leftIcon={{ type: 'material', name: 'lock' }}
                        autoCapitalize= 'none'
                        value={password1}
                        onChangeText={text => setPassword1(text)}
                        secureTextEntry
                    />
                    <Input
                        placeholder='Verify your password'
                        label='Password'
                        leftIcon={{ type: 'material', name: 'lock' }}
                        autoCapitalize= 'none'
                        value={password2}
                        onChangeText={text => setPassword2(text)}
                        secureTextEntry
                    />                
                    <Button title="Register" style={styles.button} onPress={() => register(email, password1, password2)} />
            </View>
        </SafeAreaView>
    )
}


export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 38,
        color: '#000',
        marginBottom: 20,
    },
    safe: {
        flex: 1                
    },    
});