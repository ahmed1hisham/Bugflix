import React from 'react';
import {FlatList, View, StyleSheet, Text, ScrollView} from 'react-native';
import MovieListItem from '../shared/MovieListItem/MovieListItem';
import {styles} from './styles';

export default MyMoviesList = (props) => {
  return (
    <View style={styles.container}>
      {props.movies.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          style={{paddingTop: 7.5}}
          contentContainerStyle={{paddingBottom: 15}}
          data={props.movies}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <MovieListItem movie={item} />}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
        />
      ) : (
        <ScrollView
          style={styles.emptyMoviesView}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.emptyMoviesText}>
            You haven't added any movies yet, go ahead add one now!
          </Text>
        </ScrollView>
      )}
    </View>
  );
};
