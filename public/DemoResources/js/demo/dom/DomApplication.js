Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

/*
 * Build('demo.dom.DomApplication', [ 'build::build.ui.element.Div' ],
 * function(define, $super, helper) { define({ //$extends : 'build.ui.Application',
 * $constructor : function() { //$super(this)(); } }); });
 */

Build(function() {
	console.log('Application started...');
	Build.load([ 'build::build.ui.element.Div', 'build::build.ui.form.Button' ], function() {
		div = build.ui.element.Div.create('div');
		childDiv = build.ui.element.Div.create('childDiv');
		button = build.ui.form.Button.create('My Button');
		div.addChild(childDiv);
		div.addChild(button);
		document.body.appendChild(div.element);
	});
});