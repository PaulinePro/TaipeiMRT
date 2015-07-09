# TaipeiMRT

This is a wrapper for `Taipei MRT` arrival time API.

## Install
```shell
npm install -g taipei-mrt
```

## Run
```shell
mrt 台北車站
```

## Import
```javascript
var mrt = require('taipei-mrt');

// find arrival time by station id.
mrt.findById('051', function(err, results) {
    console.log(results);
});

// find arrival time by station name.
mrt.findByName('台北車站', function(err, results) {
    console.log(results);
});

```

#### Feel free to send PR or issue :smile:
