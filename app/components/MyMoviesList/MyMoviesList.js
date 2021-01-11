import React from 'react';
import {FlatList, View, Text, ScrollView} from 'react-native';
import MovieListItem from '../shared/MovieListItem/MovieListItem';
import {styles} from './styles';

export default MyMoviesList = (props) => {
  return (
    <View testID="myMoviesListContainer" style={styles.container}>
      {props.movies.length > 0 ? (
        <FlatList
          testID="myMoviesFlatList"
          style={{flex: 1}}
          style={{paddingTop: 7.5}}
          contentContainerStyle={{paddingBottom: 15}}
          data={props.movies}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <MovieListItem testID="movieListItem" movie={item} />
          )}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
        />
      ) : (
        <ScrollView
          testID="noMoviesYetContainer"
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
