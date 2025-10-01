// app/index.tsx

import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Import Link if you want to navigate

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Safe Belt App!</Text>
      <Text style={styles.subtitle}>
        This is your new Home Screen (app/index.tsx).
      </Text>
      {/* Example link to another screen if you had one, like "details" */}
      {/* <Link href="/details">Go to Details</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});