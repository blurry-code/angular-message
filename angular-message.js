angular.module('angular-message',[])
.directive('message', function($timeout) {
    return {
      restrict: 'E',
      scope: {
          title:'@',
          text:'@',
          cancel:'@',
          class:'@',
          time:'@',
          blur:'@',
          closed:'=',
          message: '='
      },
      templateUrl:"../angular-message.html",
        link:function(scope, element, attr) {
            
            // init
                scope.myMessage = scope.message || {};
           
                // attributes
                // --> element attributes override config object attributes
                scope.myMessage.title = (scope.title ? scope.title : scope.myMessage.title) || "";
                scope.myMessage.text = (scope.text ? scope.text : scope.myMessage.text) || "";
                scope.myMessage.cancel = (scope.cancel ? scope.cancel : scope.myMessage.cancel) || "";
                scope.myMessage.class = (scope.class ? scope.class : scope.myMessage.class) || "";
                scope.myMessage.blur = (scope.blur ? scope.blur : scope.myMessage.blur) || "";
                scope.myMessage.time = (scope.time ? scope.time : scope.myMessage.time);
                scope.myMessage.closed = (scope.closed ? scope.closed : scope.myMessage.closed) || closed;
                
                // functions
                scope.myMessage.showMe = function() {
                     scope.mShow = true;
                    if (scope.myMessage.blur)
                        scope.blurNow = true;
                }    
                function closed() {
                    console.log("Message was closed!");
                }
            
            
            scope.timeout = undefined;
            scope.$watch('mShow',function(){
               if (scope.mShow && scope.myMessage.time) {
                   scope.blurNow = true;
                   scope.timeout = $timeout(function(){
                        scope.blurNow = false;
                        scope.mShow = false;
                       scope.myMessage.closed();
                   },parseInt(scope.myMessage.time));
               }  
            });
           
            
            scope.close = function() {
                scope.blurNow = false;
                scope.mShow = false;
                $timeout.cancel(scope.timeout);
                scope.myMessage.closed();
            }
            
             
        },
    }
});