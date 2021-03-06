var map; 
var pointarray;
var heatmap;
var MY_MAPTYPE_ID = 'custom_style';

var featureOpts = [
    {
      stylers: [
        {  },
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'road.local',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
        featureType: 'road.arterial',
        stylers: [
          { visibility: 'off' }
        ]
      },


    {
      featureType: 'water',
      stylers: [
        { visibility: 'on'  }
      ]
    }
];


function initialize(){

    //  build map
    // ---------------------------------
    var myLatlng = new google.maps.LatLng(51.621323, -3.943675);
    var myOptions = {
      zoom: 11,
      center: myLatlng,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
      },
      mapTypeId: MY_MAPTYPE_ID
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);


    //  customize map
    // ---------------------------------
    var styledMapOptions = {
        name: 'Custom Style'
    };
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);


    //  build array of latLng
    // ---------------------------------
    var data = [];
    var obj = null;
    points.forEach(function(point){
        // check for crimes with no latLng
        if ( point.latitude && point.longitude ){        
            obj = new google.maps.LatLng(point.latitude, point.longitude);
            data.push(obj);
        }        
    });

    //  build heat layer
    // ---------------------------------
    var pointArray = new google.maps.MVCArray(data);
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });
    heatmap.setMap(map); 
}

google.maps.event.addDomListener(window, 'load', initialize);
