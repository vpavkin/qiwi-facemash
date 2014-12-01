Handlebars.registerHelper('addPlaces', function(all) {
	return _.map(all, function(val, index) {
		return _.extend({}, val, {place: index + 1});
	});
});