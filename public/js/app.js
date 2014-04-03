$(document).ready(function(){

	Parse.initialize("ygllhC3rTkJ6tXIVmYSjeoyFX5f3qzgt6l1zHko6", "mnkxvrJwTcSkgxm492Aa41LoUlLuoKavX6vq403K");

	var HomeView = Parse.View.extend({
		events: {
			"click #logout": "logout"
		},
		el: ".content",
		template: _.template($('#home-template').html()),
		initialize: function() {
			_.bindAll(this, 'logout');
			this.render();

		},
		render: function() {
			$(this.el).html(this.template);
			this.delegateEvents();
		},
		logout: function() {
			FB.logout(function(response) {
	      // Person is now logged out
	    });
    	new AppView();
    	this.undelegateEvents();
    	delete this;
		}
	});

	var AppView = Parse.View.extend({
		el: $("#app"),
		initialize: function() {
			this.render();
		},
		render: function() {
		  FB.Event.subscribe('auth.authResponseChange', function(response) {
		    if (response.status === 'connected') {
		    	new HomeView();
		      testAPI();
		      delete this;
		    } else if (response.status === 'not_authorized') {
		      //do nothing
		      //FB.login();
		    } else {
		    	//do nothing
		      //FB.login();
		    }
		  });
		}
	});
	new AppView();
});