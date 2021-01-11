describe('Home Screen Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show home screen with correct children', async () => {
    // Checks if the home screen is rendered
    await expect(element(by.id('homeScreenContainer'))).toBeVisible();
    // Checks if the action button is visible
    await expect(element(by.id('actionButton'))).toBeVisible();
    // Checks if the tab bar is their
    await expect(element(by.id('tabBar'))).toBeVisible();
    // Checks if the ALL Movies component is visible on launch
    await expect(element(by.id('allMoviesListContainer'))).toBeVisible();
  });

  it('should navigate using tab bar buttons', async () => {
    // Tapping on MY MOVIES tab button
    await waitFor(element(by.id('myMoviesListContainer')))
      .toBeVisible()
      .whileElement(by.id('myMoviesTabButton'))
      .tap();
    // Tapping on ALL MOVIES tab button
    await waitFor(element(by.id('allMoviesListContainer')))
      .toBeVisible()
      .whileElement(by.id('allMoviesTabButton'))
      .tap();
  });

  it('should navigate between tabs through swiping left and right', async () => {
    // Swiping left to move to MY MOVIES tab
    await waitFor(element(by.id('myMoviesListContainer')))
      .toBeVisible()
      .whileElement(by.id('homeScreenContainer'))
      .swipe('left', 'fast', 0.5, 0.5);
    // Swiping right to move back to ALL MOVIES tab
    await waitFor(element(by.id('allMoviesListContainer')))
      .toBeVisible()
      .whileElement(by.id('homeScreenContainer'))
      .swipe('right', 'fast', 0.5, 0.5);
  });

  it('should show add new movie modal on action button tap', async () => {
    // Tapping on action button to check if the modal opens
    await waitFor(element(by.id('addMovieModal')))
      .toBeVisible()
      .whileElement(by.id('actionButton'))
      .tap();
  });

  it('should succesfully be able to add a new movie', async () => {
    // Moving to My Movies tab to see the new movie that is to be added
    await element(by.id('myMoviesTabButton')).tap();
    // Taps action button to open adding modal
    await waitFor(element(by.id('addMovieModal')))
      .toBeVisible()
      .whileElement(by.id('actionButton'))
      .tap();
    // Typing in movie name
    await element(by.id('movieTitle')).typeText('TestMovie');
    // Tapping to dismiss Keyboard
    await element(by.id('datePicker')).tap();
    // Tapping again to open date picker
    await waitFor(element(by.id('datePickerModal')))
      .toBeVisible()
      .whileElement(by.id('datePicker'))
      .tap();
    // Waiting for picker to pop up to tap done to select the first date in the list
    await waitFor(element(by.id('datePickerModal')))
      .not.toBeVisible()
      .whileElement(by.id('pickingDateDone'))
      .tap();
    // Typing in movie overview
    await element(by.id('overview')).typeText('This is a test overview');
    // Tapping submit and checking if the modal disappears
    await waitFor(element(by.id('addMovieModal')))
      .not.toBeVisible()
      .whileElement(by.id('submitMovie'))
      .tap();
    // Checking whether the new movie is displayed
    await expect(element(by.text('TestMovie'))).toBeVisible();
  });

  it('should show fetching indicator when list bottom edge is reached', async () => {
    // Keeps scrolling till it finds the activity indicator in the UI tree.
    // If end of list is reached and it still doesn't exist it will fail
    await waitFor(element(by.id('fetchingMoreIndicator')))
      .toExist()
      .whileElement(by.id('listOfMovies'))
      .scroll(1400, 'down', 0.1);
  });
});
