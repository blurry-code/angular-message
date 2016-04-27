# angular-message

Angular directive displaying an alert-like message. This directive uses a bootstrap panel. Following attributes can be set:

| Attribute | Format | Style | Description |
| --- | --- | --- | ---|
| title | string | bootstrap 'panel-header' | Title of the message (optional) |
| text | string | bootstrap 'panel-content' | Content of the message (optional) |
| cancel | string | bootstrap 'panel-content' | Button to close the message (optional) |
| class | string | | Sets the stlye of the panel and the button. Possible values are 'primary', 'success', 'info', 'warning' and 'danger' according to the bootstrap styles. Default is set to 'default'. (optional) |
| cancel | string | bootstrap 'panel-content' | Button to close the message (optional) |
| blur | string | | Class name of div that is to be blurred while displaying the message. No blur if not set. (optional) |
| time | string/number | | Interval until message is closed automatically. Value in milliseconds. (optional) |
| closed | function | | Callback function once the message closed. |
| message | object | | Message object containing functions and attributes. **Attributes set in HTML override the message object attributes.** |

### Example usage in HTML:
HTML:
```html
<div ng-controller="TestCtrl">
<div class="content">
...
</div>
<message title="Test Message" test="This is a test message" cancel="OK" class="info" blur="content" time="5000" closed=closedFn></message>
</div>
```
Javascript:
```javascript
.controller("TestCtrl",funtion($scope){
    $scope.closedFn = function() {
        console.log("message was closed!");
    }
})
```

### Example usage in Javascript:
In order to call the function `showMe()` a timeout with 0 milliseconds is needed since the message object's two way binding with the object within the directive needs to be completed first. 
HTML:
```html
<div ng-controller="TestCtrl">
<div class="content">
...
</div>
<message message="message1"></message>
</div>
```
Javascript:
```javascript
.controller("TestCtrl",funtion($scope, $timeout){
    $scope.message1 = {
        title:"Very serious test error!",
        text:"While testing a very serious test error occurred!",
        cancel:"Format device now!",
        blur:"content",
        class:"danger",
        time:"5000"
    };
    $timeout(function(){
        $scope.message1.showMe();
    },0)
})
```