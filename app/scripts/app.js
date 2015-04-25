(function(){
  'use strict';

  angular.module('weatherApp', ['geolocation'])

    .controller('WeatherController', function ($http, $scope, $sce, geolocation) {

      $scope.coords = '';

      geolocation
        .getLocation().then(function(data){
          var urlCoords = data.coords.latitude + ',' + data.coords.longitude;
          var url = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC2e6Yon8G4MV0nLDlzGctKcFnTy9QNLPU&q=' + urlCoords + '&zoom=15';
          $scope.url = $sce.trustAsResourceUrl(url);

          var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + data.coords.latitude + '&lon=' + data.coords.longitude;

          $http.get(weatherUrl)
            .success(function(data){
            $scope.theWeather = data;
          });
      
        });

    });

})();
