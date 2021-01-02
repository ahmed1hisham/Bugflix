import React from 'react';
import {FlatList, View, StyleSheet, Text, ScrollView} from 'react-native';
import MovieListItem from '../shared/MovieListItem/MovieListItem';
import {veryDarkGrey, white} from '../../theme/colors';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: veryDarkGrey,
    alignItems: 'center',
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreActivityIndicator: {
    marginTop: 20,
  },
  emptyMoviesView: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  emptyMoviesText: {
    width: '80%',
    fontSize: 20,
    color: white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
