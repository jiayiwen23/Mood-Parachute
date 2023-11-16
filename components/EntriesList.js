import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import EntryItem from './EntryItem';

const EntriesList = ({ entries, navigation }) => {
  return (
    <View>
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
          {entries.map((entry, id) => (
            <EntryItem entry={entry} navigation={navigation}/>
          ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      
    },
    text: {

    },
  });

export default EntriesList