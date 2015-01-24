Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.application.DomApplication', [ 'build::build.ui.Application', 'build::build.ui.element.Div', 'build::build.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function DomApplication() {
			$super(this)();
			div = build.ui.element.Div.create('div');
			childDiv = build.ui.element.Div.create('childDiv');
			button = build.form.Button.create('My Button');
			div.addChild(childDiv);
			div.addChild(button);
			this.addChild(div);
		}
	});
});

Build(function() {
	console.log('Application started...');
	application = demo.application.DomApplication.create();
	application.run(document.body);
});