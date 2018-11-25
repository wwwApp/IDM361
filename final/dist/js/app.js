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

/* function init() {
  const gameDesc = document.querySelector('.c-logo--desc');
  //const homeMenu = document.querySelector('.c-home-menu');
  gameDesc.classList.add('is-loading');
  //homeMenu.classList.add('is-loading');
}

init(); */

/**
 * Function to transfer to diff page
 */
function routeTo(pathToPage) {
  // Go to the passed in path
  location.href = pathToPage;
}
