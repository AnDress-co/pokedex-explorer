import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';

// CONCEPTO: Navegador (stack navigator)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="List"
            screenOptions={{ 
              headerShown: false, 
              contentStyle: { backgroundColor: '#F5F5F7' } 
            }}
          >
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F7' },
});
