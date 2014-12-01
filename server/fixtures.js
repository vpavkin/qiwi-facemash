var fs = Npm.require('fs');
var Fiber = Npm.require('fibers');

fs.readdir('../web.browser/app/photos/', function(err, files) {
	if (err)
		console.error("Error while updating images list:\n" + err);
	if (files && files.length) {
		for (var i = 0; i < files.length; i++) {
			var f = files[i];
			Fiber(function(file) {
				if (!Photos.findOne({path: file})) {
					Photos.insert({
						path: file,
						name: getPhotoName(file),
						stars: 0,
						randomFlag: true
					})
				}
			}).run(f);
		}
	}
});