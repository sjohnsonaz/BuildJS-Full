/**
 * @class build.widget.editor.TextEditor
 * @extends build.ui.Widget
 */
Build('build.widget.editor.TextEditor', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function TextEditor(toolBarsArray) {
			$super(this)();
			this.element.classList.add('text-editor');
			var editor = document.createElement('div');
			editor.className = 'text-editor-content';
			editor.setAttribute('contenteditable', true);
			var toolbars = document.createElement('div');
			if (toolBarsArray) {
				for (var index = 0, length = toolBarsArray.length; index < length; index++) {
					var toolsArray = toolBarsArray[index];
					var toolbar = document.createElement('ul');
					toolbar.className = 'text-editor-toolbar';
					for (var indexTools = 0, lengthTools = toolsArray.length; indexTools < lengthTools; indexTools++) {
						var toolList;
						var toolLink;
						(function() {
							var toolName = toolsArray[indexTools];
							var tool = $super(true).tools[toolName];
							if (tool) {
								toolList = document.createElement('li');
								toolLink = document.createElement('button');
								toolLink.innerHTML = tool.text;
								toolLink.title = tool.title || '';
								toolLink.addEventListener('click', function(event) {
									event.preventDefault();
									tool.run();
								});
								toolList.appendChild(toolLink);
								toolbar.appendChild(toolList);
							}
						})();
					}
					toolbars.appendChild(toolbar);
				}
			}
			this.element.appendChild(toolbars);
			this.element.appendChild(editor);
			this.watchValue('value', undefined, function(value) {
				return editor.innerHTML;
			}, function(value, hidden, cancel) {
				editor.innerHTML = typeof value !== 'undefined' ? value : '';
				return editor.innerHTML;
			});
		},
		$static : {
			tools : {
				bold : {
					text : 'B',
					title : 'Bold',
					run : function() {
						document.execCommand('bold', false);
					}
				},
				italic : {
					text : 'I',
					title : 'Italic',
					run : function() {
						document.execCommand('italic', false);
					}
				},
				underline : {
					text : 'U',
					title : 'Underline',
					run : function() {
						document.execCommand('underline', false);
					}
				},
				strikeThrough : {
					text : 'S',
					title : 'Strike Through',
					run : function() {
						document.execCommand('strikeThrough', false);
					}
				},
				insertUnorderedList : {
					text : 'UL',
					title : 'Insert Unordered List',
					run : function() {
						document.execCommand('insertUnorderedList', false);
					}
				},
				insertOrderedList : {
					text : 'OL',
					title : 'Insert Ordered List',
					run : function() {
						document.execCommand('insertOrderedList', false);
					}
				},
				createLink : {
					text : 'A',
					title : 'Create Link',
					run : function() {
						var url = prompt('URL');
						if (url) {
							document.execCommand('createLink', false, url);
						}
					}
				},
				insertImage : {
					text : 'Image',
					title : 'Insert Image',
					run : function() {
						var imageUrl = prompt('Image URL');
						if (imageUrl) {
							document.execCommand('insertImage', false, imageUrl);
						}
					}
				},
				formatBlockH1 : {
					text : 'h1',
					title : 'h1',
					run : function() {
						document.execCommand('formatBlock', false, 'H1');
					}
				},
				formatBlockH2 : {
					text : 'h2',
					title : 'h2',
					run : function() {
						document.execCommand('formatBlock', false, 'H2');
					}
				},
				formatBlockH3 : {
					text : 'h3',
					title : 'h3',
					run : function() {
						document.execCommand('formatBlock', false, 'H3');
					}
				},
				removeFormat : {
					text : 'Remove Format',
					title : 'Remove Format',
					run : function() {
						document.execCommand('removeFormat', false, '#');
					}
				}
			}
		}
	});
});