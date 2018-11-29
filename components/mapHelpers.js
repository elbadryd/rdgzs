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

module.exports.drawTheLine = drawTheMap;
