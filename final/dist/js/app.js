/**
 * Runs on app load
 */
function init()
{
  checkForAppUpdates();
}


/**
 * Function to transfer to diff page
 */
function routeTo(pathToPage) {
  // Go to the passed in path
  location.href = pathToPage;
}

/**
 * This will launch home page when app is loaded for the first time
 */
function checkFirstLaunch() {
  // Check to see if local storage is supported
  if(typeof(Storage) !== "undefined"){
    // Browser supports local storage
    var firstLaunch = localStorage.getItem('firstLaunch');
    //console.log(firstLaunch);

    // Check if user has downloaded and opened the app
    if(firstLaunch == 'true') {
      return;
    }

    // If first time launching app, update item from storage and redirect to landing page
    localStorage.setItem('firstLaunch', true);

    /* scores = [
      {
        'date':'01/24/88',
        'score':'01:45',
        'rawScore': 105
      }
    ]; */
    localStorage.setItem('scores', '[]');
    localStorage.setItem('currentScore', '0');
  }else {
    // Browser does not support local storage
    alert("This browser does NOT support local storage");
  }
}

function checkForAppUpdates() {
  window.applicationCache.addEventListener("updateready", function(e) {
    if (
      window.applicationCache.status === window.applicationCache.UPDATEREADY
    ) {
      if (
        confirm("Updates are available for this mobile web app. Load them?")
      ) {
        window.applicationCache.swapCache();
        window.location.reload();
      }
    }
  });
}

init();