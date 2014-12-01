Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

PhotosController = RouteController.extend({
	template: 'photosPage',
	waitOn: function() {
		return Meteor.subscribe('twoRandomPhotos', Session.get('photosRandomizer'));
	},
	twoPhotos: function() {
		return Photos.find({randomFlag: {$exists: true}}).fetch();
	},
	data: function() {
		return {
			photos: this.twoPhotos()
		}
	}
});

TopChartController = RouteController.extend({
	template: 'topChartPage',
	waitOn: function() {
		return Meteor.subscribe('Top');
	},
	data: function() {
		return {
			photos: Photos.find({randomFlag: {$exists: false}}, {sort: {stars: -1}}).fetch()
		}
	}
});

StatsController = RouteController.extend({
	template: 'statsPage',
	waitOn: function() {
		return Meteor.subscribe('Stats', this.params.name);
	},
	data: function() {
		return {
			photo: Photos.findOne()
		}
	}
});

Router.route('/', {
		name: 'photosPage',
		controller: PhotosController
	}
);

Router.route('/top', {
		name: 'topChartPage',
		controller: TopChartController
	}
);

Router.route('/:name', {
		name: 'stats',
		controller: StatsController
	}
);
