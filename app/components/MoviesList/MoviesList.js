import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {white} from '../../theme/colors';
import MovieListItem from '../shared/MovieListItem/MovieListItem';
import axios from 'axios';
import {styles} from './styles';

const apiKey = 'acea91d2bff1c53e6604e4985b6989e2';
const movieBaseUrl = `http://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=`;
const initialUrl = `${movieBaseUrl}1`;

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [pageToFetch, setPageToFetch] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    await moviesApiCall();
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await moviesApiCall();
    setRefreshing(false);
  };

  const moviesApiCall = async () => {
    if (props.isConnected === true) {
      await axios
        .get(initialUrl)
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          Alert.alert(error);
        });
    } else {
      Alert.alert('No Internet Connection');
    }
  };

  const fetchMoreMovies = async () => {
    if (fetchingMore === false) {
      setFetchingMore(true);
      let newPage = pageToFetch + 1;
      try {
        if (props.isConnected === true) {
          await axios
            .get(movieBaseUrl + newPage)
            .then((response) => {
              let newMovies = movies.concat(response.data.results);
              setMovies(newMovies);
            })
            .catch((error) => {
              Alert.alert(error);
            });
        } else {
          Alert.alert('No Internet Connection');
        }
      } catch (error) {
        Alert.alert(error);
      }
      setFetchingMore(false);
      setPageToFetch(newPage);
    }
  };

  const renderFooter = () => {
    if (fetchingMore === true) {
      return (
        <View testID="fetchingMoreIndicator">
          <ActivityIndicator
            testID="fetchingMoreIndicator"
            style={styles.moreActivityIndicator}
            color={white}
            size="large"
          />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderItem = ({item}) => (
    <MovieListItem testID="movieListItem" movie={item} />
  );

  return (
    <View testID="allMoviesListContainer" style={styles.container}>
      {props.isConnected !== true ? (
        <ScrollView
          style={styles.emptyMoviesView}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.emptyMoviesText}>No internet connection</Text>
          <TouchableOpacity
            onPress={fetchMovies}
            style={styles.refreshContainer}>
            <Text style={styles.emptyMoviesText}>Refresh</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : loading === true ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={white} size="large" />
        </View>
      ) : movies.length > 0 ? (
        <FlatList
          testID="listOfMovies"
          style={{flex: 1}}
          style={{paddingTop: 7.5}}
          contentContainerStyle={{paddingBottom: 15}}
          data={movies}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          }
          renderItem={renderItem}
          keyExtractor={(item) => {
            return item.id.toString() + pageToFetch.toString();
          }}
          onEndReached={fetchMoreMovies}
          onEndReachedThreshold={0.001}
          ListFooterComponent={renderFooter}
          nestedScrollEnabled={true}
        />
      ) : (
        <ScrollView
          style={styles.emptyMoviesView}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.emptyMoviesText}>
            No movies to show right now, come back later ;)
          </Text>
          <TouchableOpacity
            onPress={fetchMovies}
            style={styles.refreshContainer}>
            <Text style={styles.emptyMoviesText}>Refresh</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default React.memo(MoviesList);
