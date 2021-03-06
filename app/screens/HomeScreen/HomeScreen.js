import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Text} from 'react-native';
import {veryDarkGrey, red, white} from '../../theme/colors';
import BugflixTitle from '../../components/shared/BugflixTitle/BugflixTitle';
import {TabView, TabBar} from 'react-native-tab-view';
import MoviesList from '../../components/MoviesList/MoviesList';
import MyMoviesList from '../../components/MyMoviesList/MyMoviesList';
import FAB from 'react-native-fab';
import AddMovieModal from '../../components/AddMovieModal/AddMovieModal';
import OfflineMessage from '../../components/shared/OfflineMessage/OfflineMessage';
import {styles} from './styles';
import {useNetworkSubscription} from '../../hooks/useNetworkSubscription';

const {width, height} = Dimensions.get('window');

const HomeScreen = (props) => {
  const [isConnected, setIsConnected] = useNetworkSubscription(true);
  const [idCounter, setIdCounter] = useState(1);
  const [addMovieVisible, setAddMoviesVisible] = useState(false);
  const [myMovies, setMyMovies] = useState([]);
  const [navState, setNavState] = useState({
    index: 0,
    routes: [
      {key: 'movies', title: 'All Movies', testID: 'allMoviesTabButton'},
      {key: 'myMovies', title: 'My Movies', testID: 'myMoviesTabButton'},
    ],
  });

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
        return <MoviesList testID="allMoviesList" isConnected={isConnected} />;
      case 'myMovies':
        return <MyMoviesList testID="myMoviesList" movies={myMovies} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView testID="homeScreenContainer" style={styles.container}>
      <OfflineMessage isConnected={isConnected} />
      <BugflixTitle testID="logoTitle" />
      <TabView
        testID="tabViewContainer"
        navigationState={navState}
        renderScene={renderScene}
        onIndexChange={(index) => {
          setNavState({...navState, index});
        }}
        initialLayout={width}
        renderTabBar={(props) => (
          <View testID="tabBar" style={{alignItems: 'center'}}>
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
        iconTextComponent={
          <Text testID="actionButton" style={styles.FABIconStyle}>
            +
          </Text>
        }
      />
      <AddMovieModal
        testID="addMovieModal"
        isVisible={addMovieVisible}
        onClose={() => {
          setAddMoviesVisible(false);
        }}
        addNewMovie={addNewMovie}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
