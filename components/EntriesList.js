import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import EntryItem from './EntryItem';

const EntriesList = ({ entries }) => {
    console.log(entries);
    return (
    <View>
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
          {entries.map((entry) => (
            <View key={entry.id}>
                <EntryItem entry={entry} />
            </View>
          ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      
    },
  });

export default EntriesList