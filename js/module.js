angular.module('iThinkIKnow', [])
    .directive('scale', function() {
        return {
            restrict: 'E',
            scope: {
                customerInfo: '=info'
            },
        };
    });
