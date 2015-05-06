/**
 * @class build.widget.upload.Upload
 * @extends build.ui.Widget
 */
Build('build.widget.upload.Upload', [ 'build::build.ui.Widget', 'build::build.widget.upload.FileProgress' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Upload() {
			$super(this)();
			var self = this;
			this.innerElement = document.createElement('div');
			this.innerElement.className = 'upload-files';
			if (this.modern) {
				this.input = document.createElement('input');
				this.input.type = 'file';
				this.input.multiple = true;
				this.input.addEventListener('change', function(event) {
					self.handleFiles(this.files);
				});
			} else {
				var uploading = false;
				this.iframe = document.createElement('iframe');
				this.iframe.addEventListener('load', function(event) {
					// Get iframe body
					var iframeDocument = self.iframe.contentDocument || self.iframe.contentWindow.document;
					var iframeBody = iframeDocument.body;

					// Process returned data
					if (uploading) {
						uploading = false;
						try {
							var value = iframeBody.innerHTML;
							var data = JSON.parse(value);
							console.log(data);
						} catch (e) {
							console.log(e);
						}
					}

					// Clear iframe body
					while (iframeBody.firstChild) {
						iframeBody.removeChild(iframeBody.firstChild);
					}

					// Build form
					var form = iframeDocument.createElement('form');
					form.action = this.src;
					self.input = iframeDocument.createElement('input');
					self.input.type = 'file';
					self.input.multiple = true;
					form.appendChild(self.input);
					self.input.addEventListener('change', function(event) {
						uploading = true;
						form.submit();
					});
					iframeBody.appendChild(form);
					self.iframe.style.height = self.input.scrollHeight + 30 + 'px';
					self.iframe.style.width = self.input.scrollWidth + 30 + 'px';
				});

			}
			var dropZone = document.createElement('div');
			Object.defineProperty(this, 'draganddrop', {
				value : (('draggable' in dropZone) || ('ondragstart' in dropZone && 'ondrop' in dropZone))
			});
			if (this.draganddrop) {
				this.dropZone = dropZone;
				if (this.modern) {
					this.input.style.display = 'none';
				} else {
					this.iframe.style.display = 'none';
				}
				dropZone.addEventListener('click', function(event) {
					event.preventDefault();
					if (self.input) {
						self.input.click();
					}
				});
				dropZone.classList.add('drag-and-drop-zone');
				dropZone.innerHTML = this.modern ? 'Drop files or click to upload.' : 'Click to upload.';
				dropZone.addEventListener('dragenter', function(event) {
					event.stopPropagation();
					event.preventDefault();
					self.dropZone.classList.add('drag-enter');
				});
				dropZone.addEventListener('dragover', function(event) {
					event.stopPropagation();
					event.preventDefault();
				});
				dropZone.addEventListener('dragleave', function(event) {
					event.stopPropagation();
					event.preventDefault();
					self.dropZone.classList.remove('drag-enter');
				});
				dropZone.addEventListener('drop', function(event) {
					event.stopPropagation();
					event.preventDefault();
					self.dropZone.classList.remove('drag-enter');
					var dataTransfer = event.dataTransfer;
					self.handleFiles(dataTransfer.files);
				});
				this.element.appendChild(dropZone);
			}
			if (this.modern) {
				this.element.appendChild(this.input);
			} else {
				this.element.appendChild(self.iframe);
			}
			this.element.appendChild(this.innerElement);
		},
		$prototype : {
			handleFiles : function(files) {
				var self = this;
				for (var index = 0, length = files.length; index < length; index++) {
					(function() {
						var file = files[index];
						var fileProgress = build.widget.upload.FileProgress.create();
						fileProgress.file = file
						self.children.push(fileProgress);
						fileProgress.removeButton.addEventListener('click', function() {
							self.children.remove(fileProgress);
						});
						fileProgress.upload('/');
					})();
				}
			},
			getSize : function() {
				var nBytes = 0, oFiles = this.fileList, nFiles = oFiles.length;
				for (var nFileId = 0; nFileId < nFiles; nFileId++) {
					nBytes += oFiles[nFileId].size;
				}
				var sOutput = nBytes + " bytes";
				// optional code for multiples approximation
				for (var aMultiples = [ "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB" ], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
					sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
				}
				// end of optional code
				document.getElementById("fileNum").innerHTML = nFiles;
				document.getElementById("fileSize").innerHTML = sOutput;
			},
			modern : window.FormData !== undefined
		}
	});
});