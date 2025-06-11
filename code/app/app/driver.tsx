import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { appData } from '../lib/appData';

export default function DriverScreen() {
  const [activities, setActivities] = useState(appData.activities);

  const approve = (id: string) => {
    const updated = appData.activities.map(a =>
      a.id === id ? { ...a, approved: true } : a
    );
    appData.activities = updated;
    setActivities([...updated]);
    appData.notification = `Driver approved activity: ${updated.find(a => a.id === id)?.title}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🚗 Driver Dashboard</Text>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
            <Text style={styles.status}>
              Status: {item.approved ? '✅ Approved' : '⌛ Pending'}
            </Text>
            {!item.approved && (
              <Button title="Approve" onPress={() => approve(item.id)} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flex: 1 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#28a745',
  },
  cardText: { fontSize: 16, fontWeight: '600' },
  status: { fontSize: 14, color: '#555', marginBottom: 8 },
});
