import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import {veryDarkGrey, red, white} from '../theme/colors';
import BugflixTitle from '../components/shared/BugflixTitle/BugflixTitle';
import {TabView, TabBar} from 'react-native-tab-view';
import MoviesList from '../components/MoviesList/MoviesList';
import MyMoviesList from '../components/MyMoviesList/MyMoviesList';
import FAB from 'react-native-fab';
import AddMovieModal from '../components/AddMovieModal/AddMovieModal';
import OfflineMessage from '../components/shared/OfflineMessage/OfflineMessage';
import NetInfo from '@react-native-community/netinfo';

const {width, height} = Dimensions.get('window');

const HomeScreen = (props) => {
  const [index, setIndex] = useState(0);
  const [idCounter, setIdCounter] = useState(1);
  const [addMovieVisible, setAddMoviesVisible] = useState(false);
  const [myMovies, setMyMovies] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [navState, setNavState] = useState({
    index: 0,
    routes: [
      {key: 'movies', title: 'All Movies'},
      {key: 'myMovies', title: 'My Movies'},
    ],
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkConnection = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected === false) {
        Alert.alert('No Internet Connection');
      }
    });
  };

  const addNewMovie = (movie) => {
    movie.id = idCounter;
    let movies = myMovies;
    movies.push(movie);
    setMyMovies(movies);
    setIdCounter(movie.id + 1);
    setNavState({...navState, index: 1});
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'movies':
        return <MoviesList />;
      case 'myMovies':
        return <MyMoviesList movies={myMovies} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BugflixTitle />
      <TabView
        navigationState={navState}
        renderScene={renderScene}
        onIndexChange={(index) => {
          setNavState({...navState, index});
        }}
        initialLayout={width}
        renderTabBar={(props) => (
          <View style={{alignItems: 'center'}}>
            <TabBar
              {...props}
              style={{
                backgroundColor: veryDarkGrey,
                elevation: 0,
                width: '100%',
              }}
              indicatorStyle={{
                backgroundColor: red,
                height: 4,
              }}
              labelStyle={{
                color: white,
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 20,
              }}
            />
          </View>
        )}
      />
      <FAB
        buttonColor={red}
        iconTextColor="#FFFFFF"
        onClickAction={() => {
          setAddMoviesVisible(true);
        }}
        visible={true}
        iconTextComponent={<Text style={styles.FABIconStyle}>+</Text>}
      />
      <AddMovieModal
        isVisible={addMovieVisible}
        onClose={() => {
          setAddMoviesVisible(false);
        }}
        addNewMovie={addNewMovie}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: veryDarkGrey,
  },
  FABIconStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
export default HomeScreen;
