import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ListScreen from '../screens/ListScreen';
import ReVerifyScreen from '../screens/ReVerifyScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
        <StatusBar style="auto"/>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home"
                          component={HomeScreen}
                          options={{ title: 'Home'}}
            />
            <Stack.Screen name="Login"
                          component={LoginScreen}
                          options={{ title: 'Login'}}
            />
            <Stack.Screen name="Register"
                          component={RegisterScreen}
                          options={{ title: 'Register'}}
            />
            <Stack.Screen name="Lists"
                          component={ListScreen}
                          options={{ title: 'Lists'}}
            />
            <Stack.Screen name="ReVerify"
                          component={ReVerifyScreen}
                          options={{ title: 'ReVerify'}}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

