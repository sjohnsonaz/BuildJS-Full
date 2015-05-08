/**
 * @class build.utility.Tooltip
 */
Build('build.utility.Tooltip', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		/**
		 * @constructor
		 */
		$constructor : function Tooltip() {
			$super(this)();
		},
		$static : {
			create : function(widget, text, open, position, alignment, status) {
				if (widget instanceof build.ui.Widget) {
					widget.classList.add('tooltip');
					widget.watchClass('tooltipOpen', 'tooltip-open', !!open);
					widget.watchAttribute('tooltipText', 'aria-label', text || '', undefined, function(value, hidden, cancel) {
						return value;
					});
					widget.watchValue('tooltipPosition', position || 'top', undefined, function(value, hidden, cancel) {
						var positionClass;
						if (hidden) {
							positionClass = build.utility.Tooltip.position[hidden];
							if (positionClass) {
								widget.classList.remove(positionClass)
							}
						}
						if (!build.utility.Tooltip.position[value]) {
							value = 'top';
						}
						positionClass = build.utility.Tooltip.position[value];
						widget.classList.add(positionClass);
						return value;
					});
					widget.watchValue('tooltipAlign', alignment || 'center', undefined, function(value, hidden, cancel) {
						var alignmentClass;
						if (hidden) {
							alignmentClass = build.utility.Tooltip.alignment[hidden];
							if (alignmentClass) {
								widget.classList.remove(alignmentClass)
							}
						}
						if (!build.utility.Tooltip.alignment[value]) {
							value = 'center';
						}
						alignmentClass = build.utility.Tooltip.alignment[value];
						widget.classList.add(alignmentClass);
						return value;
					});
					widget.watchValue('tooltipStatus', status || 'normal', undefined, function(value, hidden, cancel) {
						var statusClass;
						if (hidden) {
							statusClass = build.utility.Tooltip.status[hidden];
							if (statusClass) {
								widget.classList.remove(statusClass)
							}
						}
						if (!build.utility.Tooltip.status[value]) {
							value = 'normal';
						}
						statusClass = build.utility.Tooltip.status[value];
						widget.classList.add(statusClass);
						return value;
					});
				}
				return widget;
			},
			position : {
				top : 'tooltip-top',
				bottom : 'tooltip-bottom',
				left : 'tooltip-left',
				right : 'tooltip-right'
			},
			alignment : {
				left : 'tooltip-align-left',
				center : 'tooltip-align-center',
				right : 'tooltip-align-right',
				top : 'tooltip-align-top',
				bottom : 'tooltip-align-bottom',
			},
			status : {
				normal : 'tooltip-normal',
				info : 'tooltip-info',
				success : 'tooltip-success',
				warning : 'tooltip-warning',
				error : 'tooltip-error'
			}
		}
	});
});