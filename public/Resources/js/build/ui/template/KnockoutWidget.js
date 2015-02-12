/**
 * @class build.ui.template.KnockoutWidget
 * @extends build.ui.Widget
 */
Build('build.ui.template.KnockoutWidget', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		/**
		 * @property template
		 */
		$constructor : function KnockoutWidget() {
			$super(this)();
			this.template = null;
		},
		$prototype : {
			/**
			 * @method init
			 */
			init : function() {
				$super().init(this)();
				if (this.template) {
					this.buildTemplate();
				}
			},
			/**
			 * @method buildTemplate
			 */
			buildTemplate : function() {
				var self = this;
				this.loadTemplate(this.template === true ? Build.nameToCss(this.constructor.$name) : this.template, null, function(script) {
					ko.applyBindingsToNode(self.element, {
						template : {
							name : script.id,
							data : self
						}
					});
				});
			},
			/**
			 * @method getText
			 * @param fileName
			 * @param callback
			 */
			getText : function(fileName, callback) {
				var xmlhttp;
				xmlhttp = new XMLHttpRequest();

				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						callback(xmlhttp.responseText);
					}
				};

				xmlhttp.open("GET", fileName, true);
				xmlhttp.send();
			},
			/**
			 * @method loadTemplate
			 * @param name
			 * @param id
			 * @param callback
			 */
			loadTemplate : function(name, id, callback) {
				var script = document.getElementById(id) || document.getElementById(name + '-template');
				if (script) {
					callback(script);
				} else {
					if (name.endsWith('.html')) {

					} else {
						var widgetScript = document.getElementById(name);
						if (widgetScript) {
							var fileName = widgetScript.src.replace('.js', '.html');
						} else {
							// This is probably broken
							var fileName = Build.paths.main + $name.replace(/\//g, '/') + '.html';
						}
						var script = document.createElement('script');
						script.type = 'text/html';
						script.id = id || (name + '-template');
						this.getText(fileName, function(text) {
							script.innerHTML = text;
							document.getElementsByTagName("head")[0].appendChild(script);
							callback(script);
						});
					}
				}
			},
			/**
			 * @method renderTemplate
			 * @param templateId
			 * @param callback
			 */
			renderTemplate : function(templateId, callback) {
				ko.renderTemplate(templateId || (this.cssClass + '-template'), this, {
					afterRender : function(element) {
						callback(element);
					}
				}, this.element, "replaceNode");
			}
		}
	});
});