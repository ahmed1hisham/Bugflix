import React from 'react';
import {View, Text, Dimensions, Image, ScrollView} from 'react-native';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');
const imageBaseUrl = 'https://image.tmdb.org/t/p/';
const imageFetchSize = 'w342';

const MovieListItem = (props) => {
  const {movie} = props;
  return (
    <View style={styles.movieCardContainer}>
      <View style={styles.imageContainerStyle}>
        <Image
          style={styles.imageStyle}
          source={
            movie.poster_path === null
              ? require('../../../assets/images/default_poster.jpg')
              : movie.userCreated
              ? {uri: movie.poster_path}
              : {uri: imageBaseUrl + imageFetchSize + movie.poster_path}
          }
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleStyle}>{movie.title}</Text>
        <Text style={styles.dateStyle}>Release Date: {movie.release_date}</Text>
        <ScrollView>
          <Text style={styles.overviewStyle}>{movie.overview}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default React.memo(MovieListItem, (prevProps, nextProps) => {
  return (
    prevProps.movie.title === nextProps.movie.title &&
    prevProps.movie.poster_path === nextProps.movie.poster_path
  );
});
