import React from 'react';
import { Button } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

const ReVerifyScreen = ({navigation}) => {

    console.log('reverify');
    console.log(JSON.stringify(auth));
    const user = auth.currentUser;                

    const reVerifyEmail = (auth, () => { 
        
        const user = auth.currentUser;       
        sendEmailVerification(user)
        .then(() => {
            console.log('verification email sent');
            alert('Verification email sent. Please click the link sent to your email account to verify this account.');
            // Verification email sent.
            logout();
            navigation.navigate('Login');
        })
        .catch(function(error) {
            console.log(error);
            // Error occurred. Inspect error.code.
        });
    })

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

    return (        
        <View style={styles.container}>
            <Text>Resend Verification Email to {auth.currentUser.email} ?</Text>
            <Text>Be certain this is a legitimate email you can check, if not, then you will not be able to complete the registration process.</Text>                                    
            <Button title="Re-Send Verification" style={styles.button} onPress={() => reVerifyEmail()} />
        </View>        
    )
}

export default ReVerifyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 1,
        paddingHorizontal: 32,
        borderRadius: 10,        
        backgroundColor: '#0000ff',
        color: '#000000',        
        marginBottom: 15,
    },        
});





