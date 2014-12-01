var _photosCache;

twoRandomPhotos = function() {
	_photosCache = _photosCache || Photos.find().fetch();
	if (!_photosCache || _photosCache.length < 2)
		return Photos.find();
	var n1 = Math.floor(Math.random() * _photosCache.length);
	var n2 = Math.floor(Math.random() * _photosCache.length);
	while (n2 == n1) {
		n2 = Math.floor(Math.random() * _photosCache.length);
	}

	return Photos.find({
		_id: {
			$in: [_photosCache[n1]._id, _photosCache[n2]._id]
		}
	});
};

Meteor.publish('twoRandomPhotos', function(randomizer) {
	check(randomizer, Number);
	return twoRandomPhotos();
});

Meteor.publish('Top', function() {
	return Photos.find({}, {
			fields: {randomFlag: false},
			sort: {stars: -1},
			limit: 30
		}
	);
});

Meteor.publish('Stats', function(name) {
	check(name, String);
	return Photos.find({name: name});
});