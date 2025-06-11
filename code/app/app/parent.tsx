import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import NotificationBox from '../components/NotificationBox';
import { appData } from '../lib/appData';

export default function ParentScreen() {
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState(appData.activities);
  const [notification, setNotification] = useState(appData.notification);

  const addActivity = () => {
    if (!activity) return;
    const newAct = { id: Date.now().toString(), title: activity, approved: false };
    appData.activities.push(newAct);
    setActivities([...appData.activities]);
    setActivity('');
    appData.notification = '';
    setNotification('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNotification(appData.notification);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👨‍👩‍👧 Parent Dashboard</Text>
      <NotificationBox message={notification} />
      <TextInput
        placeholder="Add a new activity"
        value={activity}
        onChangeText={setActivity}
        style={styles.input}
      />
      <Button title="Add Activity" onPress={addActivity} />
      <Text style={styles.subheading}>Your Activities:</Text>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {item.title}
            </Text>
            <Text style={styles.status}>
              Status: {item.approved ? '✅ Approved' : '⌛ Pending'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flex: 1 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subheading: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#555',
  },
});
