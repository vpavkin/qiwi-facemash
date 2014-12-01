Template.header.events({
	'click .navbar-brand': function() {
		Session.set('photosRandomizer', Math.random() * Number.MAX_VALUE);
	}
});