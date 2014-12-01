Photos = new Mongo.Collection('photos');

getPhotoName = function(path) {
	var arr = path.split(/\/|\\/);
	var name = arr[arr.length - 1];
	return name.replace(/\.jpg$/, "").replace(/\.png$/, "");
};

Meteor.methods({
	starPhoto: function(options) {
		check(options, {
			name: String
		});

		var affected = Photos.update({
			name: options.name
		}, {
			$inc: {stars: 1}
		});

		if (!affected)
			throw new Meteor.Error('invalid', "You weren't able to star this photo");
	}
});