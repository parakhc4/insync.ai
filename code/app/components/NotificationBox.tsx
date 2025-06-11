import { StyleSheet, Text, View } from 'react-native';

export default function NotificationBox({ message }: { message: string }) {
  if (!message) return null;

  return (
    <View style={styles.box}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffe3a3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    fontWeight: 'bold',
    color: '#333',
  },
});
