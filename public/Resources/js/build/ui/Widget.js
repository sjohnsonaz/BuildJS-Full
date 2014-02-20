Build('build.ui.Widget', [ 'build::build.ui.Module' ], function(define, $super, merge) {
	ko.bindingHandlers.element = {
		init : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var child = ko.unwrap(valueAccessor());
			child = child.element || child;
			element.appendChild(child);
		},
		update : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var child = ko.unwrap(valueAccessor());
			child = child.element || child;
			element.appendChild(child);
		}
	};

	ko.bindingHandlers.foreachElement = {
		init : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var children = ko.unwrap(valueAccessor());
			for (var index = 0, length = children.length; index < length; index++) {
				var child = children[index];
				child = child.element || child;
				element.appendChild(child);
			}
		},
		update : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var children = ko.unwrap(valueAccessor());
			for (var index = 0, length = children.length; index < length; index++) {
				var child = children[index];
				child = child.element || child;
				element.appendChild(child);
			}
		}
	};

	var idCount = {};
	define({
		$extends : 'build.ui.Module',
		$constructor : function() {
			$super(this)();
			this.type = 'div';
			this.id = ko.observable(this.uniqueId());
			this.cssClass = ko.observable(this.uniqueClass());
			this.template = null;
		},
		$prototype : {
			build : function(callback) {
				if (this.template) {
					this.templateHandle = ko.observable('no-template');
					// this.element.dataset.bind=
					var self = this;
					this.loadTemplate(this.template === true ? Build.nameToCss(this.constructor.$name) : this.template, null, function(script) {
						ko.applyBindingsToNode(self.element, {
							template : {
								name : script.id,
								data : self
							}
						});
						if (typeof callback == 'function') {
							callback.apply(self);
						}
					});
				} else {
					if (typeof callback == 'function') {
						callback.apply(this);
					}
				}
			},
			createElement : function() {
				this.element = document.createElement(this.type);
				// this.element.classList.add(this.uniqueClass());
				this.element.controller = this;

				ko.applyBindingsToNode(this.element, {
					attr : {
						id : this.id,
						'class' : this.cssClass
					}
				});
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
		},
		$static : {
			create : function() {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.createElement();
				result.build();
				return result;
			}
		}
	});
});