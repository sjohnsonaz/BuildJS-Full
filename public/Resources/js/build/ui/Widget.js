Build('build.ui.Widget', [ 'build.ui.Module' ], function(define, $super) {
	var idCount = {};
	define({
		$extends : 'build.ui.Module',
		$constructor : function(parameters) {
			parameters = parameters || {};
			$super(this)(parameters);
			this.type = parameters.type || 'div';
			this.template = parameters.template;
			this.createElement();
		},
		$prototype : {
			createElement : function() {
				this.element = document.createElement(this.type);
				this.element.id = this.uniqueId();
				this.element.classList.add(this.uniqueClass());
				this.element.controller = this;

				if (this.template) {
					var self = this;
					this.loadTemplate(this.template === true ? Build.nameToCss(this.constructor.$name) : this.template, null, function(script) {
						self.renderTemplate(script.id, function(renderedElement) {
							self.build(renderedElement);
						});
					});
				} else {
					this.build();
				}
			},
			build : function(renderedElement) {
			},
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
			renderTemplate : function(templateId, callback) {
				ko.renderTemplate(templateId || (this.cssClass + '-template'), this, {
					afterRender : function(element) {
						callback(element);
					}
				}, this.element, "replaceNode");
			},
			uniqueId : function() {
				var $name = this.constructor.$name;
				idCount[$name] = idCount[$name] ? idCount[$name] + 1 : 0;
				return Build.nameToCss($name + '-' + idCount[$name]);
			},
			uniqueClass : function() {
				return Build.nameToCss(this.constructor.$name);
			},
			appendChild : function(widget) {
				this.element.appendChild(widget.element);
			},
			removeChild : function(widget) {
				this.element.removeChild(widget.element);
			}
		}
	});
});