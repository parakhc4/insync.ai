import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { appData } from '../lib/appData';

export default function CookScreen() {
  const [note, setNote] = useState('');
  const [submittedNote, setSubmittedNote] = useState('');

  const submit = () => {
    appData.cookNote = note;
    appData.notification = `Cook submitted: "${note}"`;
    setSubmittedNote(note);
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👩‍🍳 Cook Dashboard</Text>
      <TextInput
        placeholder="Write your note for the Parent"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button title="Submit Note" onPress={submit} />
      {submittedNote && (
        <Text style={styles.noteText}>Note Submitted: {submittedNote}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff9ec', flex: 1 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
});
