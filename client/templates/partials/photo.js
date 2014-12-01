var voteFor = function(e) {
	e.preventDefault();

	Meteor.call('starPhoto', {name: this.name}, function(error, result) {
		// display the error to the user and abort
		if (error)
			console.log(error);

		Session.set('photosRandomizer', Math.random() * Number.MAX_VALUE)
	});
};

Template.photo.helpers({
	url: function() {
		return PHOTOS_FOLDER + this.path;
	},
	mapUrl: function() {
		return "https://map.qiwi.com"
	}
});

Template.photo.events({
	"click .photo-source": voteFor,
	"click .like-button": voteFor
});