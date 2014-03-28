Build('build.ui.Widget', [ 'build::build.ui.Module', 'build::build.utility.ObservableArray' ], function(define, $super, merge) {
	var idCount = {};
	define({
		$extends : 'build.ui.Module',
		$constructor : function() {
			$super(this)();
			this.type = 'div';
			this.watchProperty('id');
			this.watchProperty('className');
			this.children = build.utility.ObservableArray();
			this.children.subscribe(function() {
				this.refreshChildren();
			}.bind(this));
			this.directAppend = false;
			this.template = null;
		},
		$prototype : {
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
			init : function() {
				this.id = this.uniqueId();
				this.className = this.uniqueClass();
				this.refreshChildren();
			},
			createElement : function() {
				this.element = document.createElement(this.type);
				// this.element.classList.add(this.uniqueClass());
				this.element.controller = this;
			},
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
					if (this.children) {
						this.children.forEach(this.childIterator.bind(this));
					}
				}
			},
			childIterator : function(child, index, array) {
				if (child) {
					if (this.directAppend) {
						this.element.appendChild(child.element || child);
					} else {
						var iterator = document.createElement('div');
						iterator.appendChild(child.element || child);
						iterator.className = 'panel-iterator';
						this.element.appendChild(iterator);
					}
				}
			},
			addChild : function(child) {
				this.children.push(child);
			},
			removeChild : function(child) {
				var index = this.children.indexOf(child);
				if (index != -1) {
					this.children.splice(index, 1);
				}
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
				idCount[$name] = idCount[$name] !== undefined ? idCount[$name] + 1 : 0;
				return Build.nameToCss($name + '-' + idCount[$name]);
			},
			uniqueClass : function() {
				return Build.nameToCss(this.constructor.$name);
			},
			// appendChild : function(widget) {
			// this.element.appendChild(widget.element);
			// },
			// removeChild : function(widget) {
			// this.element.removeChild(widget.element);
			// },
			addClass : function(cssClass) {
				if (cssClass) {
					var classes = this.cssClass.split(' ');
					var index = classes.indexOf(cssClass);
					if (index == -1) {
						classes.push(cssClass);
						this.cssClass = classes.join(' ');
					}
				}
			},
			removeClass : function(cssClass) {
				if (cssClass) {
					var classes = this.cssClass.split(' ');
					var index = classes.indexOf(cssClass);
					if (index != -1) {
						classes.splice(index, 1);
						this.cssClass = classes.join(' ');
					}
				}
			},
			addEvent : function(type, listener, useCapture, bind) {
				if (bind) {
					this.element.addEventListener(type, listener.bind(bind, this.element), useCapture);
				} else {
					this.element.addEventListener(type, listener, useCapture);
				}
			},
			removeEvent : function(type, listener) {
				this.element.removeEventListener(type, listener);
			},
			watchProperty : function(property, name) {
				name = name || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element[name];
					},
					set : function(value) {
						this.element[name] = value;
						this.publish(property);
					}
				});
			},
			watchAttribute : function(property, attribute) {
				attribute = attribute || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.getAttribute(attribute);
					},
					set : function(value) {
						this.element.setAttribute(attribute, value);
						this.publish(property);
					}
				});
			},
			watchStyle : function(property, style, unit) {
				style = style || property;
				if (unit) {
					Object.defineProperty(this, property, {
						get : function() {
							return parseFloat(this.element.style[style]);
						},
						set : function(value) {
							this.element.style[style] = value + unit;
							this.publish(property);
						}
					});
				} else {
					Object.defineProperty(this, property, {
						get : function() {
							return this.element.style[style];
						},
						set : function(value) {
							this.element.style[style] = value;
							this.publish(property);
						}
					});
				}
			},
			watchData : function(property, data) {
				data = data || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.dataset[data];
					},
					set : function(value) {
						this.element.dataset[data] = value;
						this.publish(value);
					}
				});
			},
		},
		$static : {
			create : function() {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.createElement();
				if (result.template) {
					result.buildTemplate();
				} else {
					result.init.apply(result, arguments);
				}
				return result;
			}
		}
	});
});