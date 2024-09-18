import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../lib/firebase';
import LoginScreen from "../screens/LoginScreen";

const Card = ({item}) => {

    const navigation = useNavigation();
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={ () => { navigation.navigate('Lists', { listObject: item })}}
        >            
            <View style={[styles.card]}>
                <Image
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                />
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>        
    )
}

export default Card;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },    
    card: {
        borderWidth: 0,
        minHeight: 300,
        minWidth: 350,
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 12,
        marginTop: 0,
        backgroundColor: '#FFFFFF',
        marginRight: 0,
        alignSelf: "stretch"
    },
    cardImage: {
        flex: 1,
        height: 150,
        borderRadius: 3,
    },
    cardContent: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    cardHeader: {
        paddingBottom: 5
    },
    title: {
        fontSize: 22,
        textAlign: 'center'
    },
    description: {
        fontSize: 15
    },
});
