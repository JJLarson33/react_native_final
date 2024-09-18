import React, { useEffect, useState, useRef } from "react";
import { Button } from '@rneui/themed';
import { StyleSheet, ScrollView, Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import { auth, db } from '../lib/firebase';
import { collection, onSnapshot, orderBy, query, limit, addDoc, Timestamp } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, ThemeProvider } from '../contexts/ThemeContext';


const ListScreen = ({route}) => {    

    const { listObject } = route.params;        

    const [listItems, setListItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const itemsRef = collection(db, 'list0');
    const q = query(itemsRef, orderBy('createdAt', 'asc'), limit(25));    

    useEffect( () => {
        // Call checkMessages from Firebase
        const checkListItems = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setListItems(items);
            setIsLoaded(true);
        })

        return checkListItems;
    },[])

    const [ item, setItem ] = useState('');

    const addItem = async (item) => {

        const { uid } = auth.currentUser;
        const userName = getName();                

        setItem('');

        console.log("Adding item to list");
        // Firebase send message
        await addDoc(collection(db, "list0"), {
            uid,
            userName,
            createdAt: Timestamp.now(),            
            text: 'From ' + userName + "\n" + item,                                                              
        }).then( (docRef) => {
            console.log("Adding doc " + JSON.stringify(docRef))
        }).catch( (err) => (
            console.log("Error adding doc")
        )).finally( () => {
            console.log("Finally sent...");
        })
    }

    const ListHeader = () => {

        const th = useTheme();

        return (

            <ThemeProvider>
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: th.theme.backgroundColor, marginBottom: 20, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 20, color: th.theme.primary, alignSelf: 'center', marginBottom: 5 }}>{ listObject.title }</Text>                
                    <Text style={{ fontSize: 16, color: th.theme.primary, alignSelf: 'center' }}>{ listObject.body }</Text>                                
                    <Button buttonStyle={{ backgroundColor:th.theme.body, width: 250, marginBottom: 10, marginTop: 10 }} onPress={ () => auth.signOut()}>
                        <Text style={{ color: th.theme.backgroundColor, fontSize: 20, fontFamily: 'Georgia' }}>Sign Out</Text>
                    </Button>
                    <View> 
                        <MaterialCommunityIcons.Button name="theme-light-dark" size={25} color={th.theme.backgroundColor} backgroundColor={th.theme.body} borderRadius={25}                         
                        iconStyle={{ marginRight: 0 }} onPress={ () => th.toggleTheme(th.theme)} />
                    </View>
                </View>
            </ThemeProvider>
        )
    }    

    const ListLoader = () => {
        
        const svRef = useRef();
    
        if (!isLoaded)
        {
            return <Text>Loading...</Text>
        } 
        else 
        {
            return (                                       
                <ScrollView ref={svRef}                    
                    onContentSizeChange={ () => svRef.current.scrollToEnd({ animated: true })}
                    contentContainerStyle={{ flexGrow: 1}}>                    
                        <View>                                                                
                            { listItems.map( (item, i) => <ListedByWho key={i} item={item} /> )}                                                                                       
                        </View>                    
                </ScrollView>              
            )
        }
    }
    
    const ListFooter = () => {

        const th = useTheme();

        return (

            <ThemeProvider>
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: th.theme.backgroundColor, marginTop: 10, paddingTop: 20, paddingBottom: 20 }}>                    
                    <Button buttonStyle={{ backgroundColor:th.theme.body, width: 250,}} onPress={ () => addItem(item)}>
                        <Text style={{ color: th.theme.backgroundColor, fontSize: 20, fontFamily: 'Georgia' }}>Add Item</Text>
                    </Button>
                </View>                
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider>
            <SafeAreaView>
                <ListHeader />
                <ListLoader />
                <KeyboardAvoidingView            
                    behavior={Platform.OS === 'ios' ? 'position' : 'height' }
                    keyboardVerticalOffset={0}            
                    style={{ flexGrow: 1 }}>
                    <View>
                        <TextInput
                        style={styles.input}
                        onChangeText={text => setItem(text)}
                        value={item}
                        placeholder="Enter list item"
                        autoCapitalize="none"
                        alignSelf="center"
                        />
                    </View>
                    </KeyboardAvoidingView>
                <ListFooter />                    
            </SafeAreaView>
        </ThemeProvider>
    )    
}

const ListedByWho = (props) => {
    const { text, uid } = props.item;
    console.log(text);

    const mineOther = ( uid === auth.currentUser?.uid) ? styles.listItemMine : styles.listItemOther;

    return (
        <View style={mineOther}>            
            <Text size={14} style={styles.listText}>{text}</Text>
        </View>
    )
}

const getName = () => {
                                                   
    const email = auth.currentUser.email;
    let userNames = email.split('@');
    let userName = userNames[0];
    userNames.length = 0;
    console.log("userName came from user " + userName);
    return userName;                           
}

export default ListScreen;

const styles = StyleSheet.create({
    inner: {
        flex: 1,        
    },      
    chat: {
        backgroundColor: '#fff',
    },
    listItemMine: {
        width: 300,
        backgroundColor: '#00ddaa',
        color: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
    },
    listItemOther: {
        width: 300,
        backgroundColor: '#0099ff',
        color: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
    },    
    listText: {
        color: '#ffffff',
        fontSize: 14,
    },    
    input: {
        borderWidth: 1,
        borderColor: '#aaaaaa',
        padding: 10,
        marginBottom: 10,
        width: 250,
    },
    signOutButton: {
        padding: 0,
        paddingHorizontal: 52,
        borderRadius: 25,        
        backgroundColor: '#0000ff',                
        marginBottom: 10,
        marginTop: 5,
    },
    addButton: {
        padding: 0,
        paddingHorizontal: 32,
        borderRadius: 10,        
        backgroundColor: '#0000ff',
        color: '#000000',        
        marginBottom: 15,
    },    
    title: {
        fontSize: 30,
        alignSelf: 'center',
    },
    body: {
        fontSize: 15,
        alignSelf: 'center',
    },
  });