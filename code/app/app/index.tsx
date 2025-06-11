import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏡 FamilyApp</Text>
      <Text style={styles.subtitle}>Manage your household like a pro</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push('/parent')}>
          <Text style={styles.buttonText}>👪 Parent Dashboard</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/driver')}>
          <Text style={styles.buttonText}>🚗 Driver Dashboard</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/cook')}>
          <Text style={styles.buttonText}>👩‍🍳 Cook Dashboard</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Made for Turno with 💙</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7fe', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  buttonContainer: { width: '100%', gap: 16 },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  footer: { position: 'absolute', bottom: 30, color: '#999' },
});
