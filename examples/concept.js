var lat = 50;
var lng = -70;
var zoom = 5;
//var extent = [-83, 44, -57, 55];
var extent = [-9259955, 5467881, -6324773, 7424669];

var ol3map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'ol3map',
  view: new ol.View({
    center: ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857'),
    zoom: zoom
  })
});

// FIXME - style override, this should be managed internally
/*
gmap.data.setStyle({
  icon: 'resources/evouala.png'
});
*/


var olgmMain = new olgm.OLGoogleMaps({
  ol3map: ol3map
});


var vector = new ol.layer.Vector({
  source: new ol.source.Vector()
});
ol3map.addLayer(vector);

olgmMain.activate();

document.getElementById('map-type').onchange = function() {
  olgmMain.toggle();
};

document.getElementById('add-point').onclick = function() {
  vector.getSource().addFeature(generateFeature());
};


var generateFeature = function() {
  var extent = [-9259955, 5467881, -6324773, 7424669];
  var deltaX = extent[2] - extent[0];
  var deltaY = extent[3] - extent[1];
  var point = new ol.geom.Point([
    extent[0] + (deltaX * Math.random()),
    extent[1] + (deltaY * Math.random())
  ]);
  var feature = new ol.Feature(point);
  return feature;
};
