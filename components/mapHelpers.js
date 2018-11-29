const drawTheMap = (map, line, bounds) => {
  const data = {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: { },
      geometry: {
        type: 'LineString',
        coordinates: line,
      },
    },
  };
  map.on('load', () => {
    map.addSource('route', data);
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#E87111',
        'line-width': 6,
      },
    })
      .fitBounds(bounds, {
        padding: 20,
      });
  });
};

// const poiHandler = (poi, i) => {
//   const obj = {
//     type: 'Feature',
//     properties: {
//       description: `<img src=${poi.img} height="150px" width="150px"><br>
//       <strong>${poi.name}</strong>
//       <div onClick="window.cainTest[${i}]()">add to trip</div>`,
//       icon: 'theatre',
//     },
//     geometry: {
//       type: 'Point',
//       coordinates: [poi.lng, poi.lat],
//     },
//   };
//   return obj;
// };

// module.exports.poiHandler = poiHandler;
module.exports.drawTheLine = drawTheMap;
