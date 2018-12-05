/* eslint-disable no-restricted-syntax */
// SELECT DISTINCT ?place ?placeLabel ?location WHERE {

//   // Use the around service
//   SERVICE wikibase:around {
//     // Looking for items with coordinate locations(P625)
//     ?place wdt:P625 ?location .

//   // That are in a circle with a centre of with a point
//     bd:serviceParam wikibase:center "Point(4.8,44.32)"^^geo:wktLiteral   .
//   // Where the circle has a radius of 20km
//     serviceParam wikibase:radius "20" .
//     bd:serviceParam wikibase:distance ?distance .
//   } .

//   ?place wdt:P31/wdt:P279* ?city .

//   // Use the label service to get the English label
//   SERVICE wikibase:label {
//   bd:serviceParam wikibase:language "en" .
//   }
// }
// ORDER BY ?distance


const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT ?musicianLabel
WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?musician wdt:P106 wd:Q639669.
  ?musician wdt:P19 wd:Q34404.
}
LIMIT 1007`;

const fullUrl = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`;
const headers = { Accept: 'application/sparql-results+json' };

fetch(fullUrl, { headers }).then(body => body.json()).then((json) => {
  const { head: { vars }, results } = json;
  for (const result of results.bindings) {
    for (const variable of vars) {
      console.log('%s: %o', variable, result[variable]);
    }
    console.log('---');
  }
});
