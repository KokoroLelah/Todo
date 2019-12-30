import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function PostCard({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f1c40f',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    color: '#0f1096',
    fontWeight: '400',
    margin: 10,
    textTransform: 'capitalize',
    flex: 1,
  },
});

export default PostCard;
