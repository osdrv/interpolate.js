Interpolate.media("width: 800px", {
  '.test h1': {
    'font-size': 21,
  	'letter-spacing': 2,
  	'word-spacing': 11
  }
}).media('width: 1024px', {
  '.test h1': {
    'font-size': 25,
    'letter-spacing': 4,
	  'word-spacing': 9
  }
}).media("width: 1280px", {
  '.test h1': {
    'font-size': 25,
    'letter-spacing': 7,
  	'word-spacing': 6
  }
}).media("width: 1920px", {
  '.test h1': {
    'font-size': 25,
    'letter-spacing': 11,
    'word-spacing': 9
  }
});