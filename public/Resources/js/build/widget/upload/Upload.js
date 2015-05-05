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
			this.input = document.createElement('input');
			this.input.type = 'file';
			this.input.multiple = true;
			this.input.addEventListener('change', function(event) {
				self.handleFiles(this.files);
			});
			var dropZone = document.createElement('div');
			Object.defineProperty(this, 'draganddrop', {
				value : (('draggable' in dropZone) || ('ondragstart' in dropZone && 'ondrop' in dropZone))
			});
			if (this.draganddrop) {
				this.dropZone = dropZone;
				this.input.style.display = 'none';
				dropZone.addEventListener('click', function(event) {
					event.preventDefault();
					self.input.click();
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
			this.element.appendChild(this.input);
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