import 'react-native';
import React, {useState as useStateMock} from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import HomeScreen from '../app/screens/HomeScreen/HomeScreen';
import {shallow} from 'enzyme';
import MoviesList from '../app/components/MoviesList/MoviesList';
import MyMoviesList from '../app/components/MyMoviesList/MyMoviesList';
import MovieListItem from '../app/components/shared/MovieListItem/MovieListItem';

jest.useFakeTimers();

it('App renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Home renders correctly', () => {
  const component = shallow(<HomeScreen />);
  expect(component).toMatchSnapshot();
});

it('Movies List Component renders correctly', () => {
  const component = shallow(<MoviesList isConnected={true} />);
  expect(component).toMatchSnapshot();
});

it('My Movie List Component renders correctly', () => {
  const movies = [
    {
      poster_path: null,
      userCreated: true,
      title: 'TestMovie',
      overview: 'Test overview',
      release_date: '2020',
      id: 1,
    },
  ];
  const component = shallow(<MyMoviesList movies={movies} />);
  expect(component).toMatchSnapshot();
});

it('Add movie modal renders correctly', () => {
  const component = shallow(
    <MoviesList
      isVisible={true}
      onClose={() => {
        jest.fn();
      }}
      testID="fakeTestID"
    />,
  );
  expect(component).toMatchSnapshot();
});
