angular.module('angular-message',[])
.directive('message', function($timeout) {
    return {
      restrict: 'E',
      scope: {
          title:'@',
          text:'@',
          time:'@',
          cancel:'@',
          class:'@',
          blur:'@'
      },
      templateUrl:"../angular-message.html",
        link:function(scope, element, attr) {
            scope.timeout = undefined;
            scope.blurNow = scope.blur;
            scope.$watch('mShow',function(){
               if (scope.mShow && scope.time) {
                   scope.blurNow = true;
                   scope.timeout = $timeout(function(){
                        scope.blurNow = false;
                        scope.mShow = false;
                   },parseInt(scope.time));
               }  
            });
            scope.mShow = true;  
            
            scope.close = function() {
                scope.blurNow = false;
                scope.mShow = false;
                $timeout.cancel(scope.timeout);
            }
        },
    }
});