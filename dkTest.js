angular.module( 'dkTest', [] )
//
// Controllers
//
    .controller('assumptions', [ '$scope', function( $scope, $element ) {
	$scope.scaleType	= 'percent';

	$scope.range		= range( 1, 11 ).map( function( item, index, array ) {

	    var obj = {};
	    obj.value		= item,
	    obj.color		= item <=	2 ? 'danger'
		: item <=			4 ? 'warning'
		: item <=			6 ? 'primary'
		: item <=			8 ? 'warning'
		: item <=			10? 'danger'
		: '';
	    return obj;
	})
	
        $scope.slider = true;
	$scope.name		= 'assumption';
    }])

    .controller('threshold', [ '$scope', function( $scope, $element ) {
	$scope.scaleType	= 'percent';

	$scope.range		= range( 1, 11 ).map( function( item, index, array ) {

	    var obj = {};
	    obj.value		= item,
	    obj.color		= item <=	2 ? 'danger'
		: item <=			4 ? 'warning'
		: item <=			6 ? 'info'
		: item <=			8 ? 'primary'
		: item <=			10? 'success'
		: '';
	    return obj;
	})
	
        $scope.slider = true;
	$scope.name		= 'assumption';
    }])

//
// Modules
//
    .directive('scale', function() {
	return {
	    restrict: 'E',
	    templateUrl: 'scale.html',
	    transclude: true
	};
    })

    .directive('slider', ['$parse', '$timeout', function ($parse, $timeout) {
	return {
	    restrict: 'AE',
	    replace: true,
	    templateUrl: 'slider.html',
	    require: 'ngModel',
	    transclude: true,
            link: function ($scope, element, attrs, ngModelCtrl) {
	        $.fn.slider.Constructor.prototype.disable = function () {
	            this.picker.off();
	        };

	        $.fn.slider.Constructor.prototype.enable = function () {
	            this.picker.on();
	        };

                if (attrs.ngChange) {
                    ngModelCtrl.$viewChangeListeners.push(function() {
                        $scope.$apply(attrs.ngChange);
                    });
                }
                console.log(attrs);
                var options = {};

	        if ( attrs.sliderid )
                    options.id			= attrs.sliderid;

	        if ( attrs.min )
                    options.min			= parseFloat( attrs.min );

	        if ( attrs.max )
                    options.max			= parseFloat( attrs.max );

	        if ( attrs.step )
                    options.step		= parseFloat( attrs.step );

	        if ( attrs.precision )
                    options.precision		= parseFloat( attrs.precision );

	        if ( attrs.orientation )
                    options.orientation		= attrs.orientation;

	        if ( attrs.value ) {
	            if ( angular.isNumber( attrs.value ) || angular.isArray( attrs.value ) )
	        	options.value = attrs.value;
                    else if ( angular.isString( attrs.value ) ) {
	        	if ( attrs.value.indexOf( "[" ) === 0 ) {
	        	    options.value = angular.fromJson(attrs.value);
	        	}
                        else {
	        	    options.value = parseFloat(attrs.value);
	        	}
	            }
	        }
                
	        if ( attrs.range )
                    options.range		= attrs.range === 'true';

	        if ( attrs.selection )
                    options.selection		= attrs.selection;

	        if ( attrs.tooltip )
                    options.tooltip		= attrs.tooltip;

	        if ( attrs.tooltipseparator )
                    options.tooltip_separator	= attrs.tooltipseparator;

	        if ( attrs.tooltipsplit )
                    options.tooltip_split	= attrs.tooltipsplit === 'true';

                if ( attrs.handle )
                    options.handle		= attrs.handle;

                if ( attrs.reversed )
                    options.reversed		= attrs.reversed === 'true';

                if ( attrs.enabled )
                    options.enabled		= attrs.enabled === 'true';

                if ( attrs.naturalarrowkeys )
                    options.natural_arrow_keys	= attrs.naturalarrowkeys === 'true';

                if ( attrs.formater )
                    options.formater		= $scope.$eval(attrs.formater);

	        if (options.range && !options.value) {
	            options.value		= [0,0]; // This is needed, because of value defined at $.fn.slider.defaults - default value 5 prevents creating range slider
	        }

	        var slider			= $( element[0] ).slider( options );
	        var updateEvent			= attrs.updateevent || 'slide';

	        slider.on( updateEvent, function( ev ) {
	            ngModelCtrl.$setViewValue( ev.value );
	            $timeout( function() {
	        	$scope.$apply();
	            } );
	        } );

	        $scope.$watch( attrs.ngModel, function( value ) {
	            if( value || value === 0 ) {
	        	slider.slider( 'setValue', value, false );
	            }
	        } );

	        if ( angular.isDefined( attrs.ngDisabled ) ) {
	            $scope.$watch( attrs.ngDisabled, function( value ) {
	        	if ( value ) {
	        	    slider.slider( 'disable' );
	        	} else {
	        	    slider.slider( 'enable' );
	        	}
	            });
	        }
	    }
	};
    }])
