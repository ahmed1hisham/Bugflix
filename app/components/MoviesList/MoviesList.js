import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {veryDarkGrey, white, red} from '../../theme/colors';
import MovieListItem from '../shared/MovieListItem/MovieListItem';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const apiKey = 'acea91d2bff1c53e6604e4985b6989e2';
const movieBaseUrl = `http://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=`;
const initialUrl = `${movieBaseUrl}1`;

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [pageToFetch, setPageToFetch] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    //checkConnection();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      console.log('changed to: ' + state.isConnected);
    });
    fetchMovies();

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      await NetInfo.fetch().then(async (state) => {
        if (state.isConnected === true) {
          setIsConnected(true);
          await axios
            .get(initialUrl)
            .then((response) => {
              setMovies(response.data.results);
            })
            .catch((error) => {
              Alert.alert(error);
            });
        } else {
          setIsConnected(false);
          Alert.alert('No Internet Connection');
        }
      });
    } catch (error) {
      Alert.alert(error);
    }
    setLoading(false);
  };

  const fetchMoreMovies = async () => {
    if (fetchingMore === false) {
      setFetchingMore(true);
      let newPage = pageToFetch + 1;
      try {
        await NetInfo.fetch().then(async (state) => {
          if (state.isConnected === true) {
            setIsConnected(true);
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
            setIsConnected(false);
            Alert.alert('No Internet Connection');
          }
        });
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
        <ActivityIndicator
          style={styles.moreActivityIndicator}
          color={white}
          size="large"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {isConnected === false ? (
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
          style={{flex: 1}}
          style={{paddingTop: 7.5}}
          contentContainerStyle={{paddingBottom: 15}}
          data={movies}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          renderItem={({item}) => <MovieListItem movie={item} />}
          keyExtractor={(item) => {
            return item.id.toString() + pageToFetch.toString();
          }}
          onEndReached={fetchMoreMovies}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <ScrollView
          style={styles.emptyMoviesView}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.emptyMoviesText}>
            No movies to show right now, come back later ;)
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
  refreshContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: red,
    borderRadius: 10,
  },
});
export default React.memo(MoviesList);
