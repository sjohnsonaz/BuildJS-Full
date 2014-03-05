Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build::build.ui.Application', 'build::build.ui.form.Form', 'build::build.ui.form.Button', 'build::build.ui.form.ButtonGroup', 'build::build.ui.form.Header1', 'build::build.ui.form.Paragraph',
		'build::build.ui.tab.TabContainer', 'build::build.ui.tab.TabPanel', 'demo::demo.ui.form.TestForm', 'build::build.ui.form.FieldSet', 'build::build.ui.form.FormControl', 'build::build.ui.form.Label', 'build::build.ui.form.Text',
		'build::build.ui.form.TextArea', 'demo::demo.singleton.SingletonTest' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();

			// Add title
			var title = build.ui.form.Header1.create('BuildJS');
			this.addChild(title);

			// Add tab container
			var tabContainer = build.ui.tab.TabContainer.create();
			var tabPanel0 = build.ui.tab.TabPanel.create('Widget Form');
			var tabPanel1 = build.ui.tab.TabPanel.create('Template Form');
			tabContainer.addChild(tabPanel0);
			tabContainer.addChild(tabPanel1);
			this.addChild(tabContainer);

			// Add form and button
			var header0 = build.ui.form.Header1.create('Widget Form');
			var form = build.ui.form.Form.create();
			var button = build.ui.form.Button.create('Button 1');
			form.addChild(button);
			var buttonGroup = build.ui.form.ButtonGroup.create();
			buttonGroup.addChild(build.ui.form.Button.create('Button 2'));
			buttonGroup.addChild(build.ui.form.Button.create('Button 3'));
			buttonGroup.addChild(build.ui.form.Button.create('Button 4'));
			form.addChild(buttonGroup);
			
			form.addChild(build.ui.form.Paragraph.create(new demo.singleton.SingletonTest().data));
			form.addChild(build.ui.form.Paragraph.create(new demo.singleton.SingletonTest().data));

			var fieldSet = build.ui.form.FieldSet.create('Text Field FieldSet');
			var text = build.ui.form.Text.create();
			text.placeholder('Text');
			fieldSet.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Text Field'), text));

			var textArea = build.ui.form.TextArea.create();
			textArea.placeholder('Text');
			fieldSet.addChild(textArea);
			form.addChild(fieldSet);

			tabPanel0.addChild(header0);
			tabPanel0.addChild(form);

			// Add testForm
			var testForm = demo.ui.form.TestForm.create();
			tabPanel1.addChild(testForm);

			// Add routes
			this.router.add('#/test/:id', function(id) {
				console.log('test started: ' + id);
			});
			this.router.watch(tabContainer, 'openTabIndex', 'tab', tabContainer.openTabIndex);
			this.router.listen();
		}
	});
});

Build(function() {
	console.log('Application started...');
	application = demo.inheritance.Application.create();
	ko.applyBindingsToNode(document.body, {
		element : application
	});
	// Build.load([], function() {});
});