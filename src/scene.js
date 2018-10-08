var util = require('util');

exports.New = function(canvasId) {
    return new Scene(canvasId);
};

var Scene = function(canvasId) {
    var self = this;
    var canvas = this.canvas = document.getElementById(canvasId);
    this.$canvas = $('#' + canvasId);

    util.assert(!util.isNullOrUndefined(this.canvas), "canvas cannot be null");

    this.context = this.canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.width = $(canvas).width();
    this.height = $(canvas).height();
    this.objectGroup = null;

    $(window).on('load', function() {
        self.canvas.width = $(canvas).width();
        self.canvas.height = $(canvas).height();
        self.onChangeSceneRange(0, 0, self.canvas.width, self.canvas.height);
    });

    $(window).resize(function() {
        self.canvas.width = $(canvas).width();
        self.canvas.height = $(canvas).height();
        self.onChangeSceneRange(0, 0, self.canvas.width, self.canvas.height);
    });
};

Scene.prototype.getContext = function() {
    return this.context;
};

Scene.prototype.draw = function() {
    this.onChangeSceneRange(this.x, this.y, this.width, this.height);
};

Scene.prototype.setObjectGroup = function(objectGroup) {
    util.assert(!util.isNullOrUndefined(objectGroup), 'child cannot be null or undefined');
    util.assert(util.isNullOrUndefined(this.objectGroup), 'objectGroup is already set');

    objectGroup.setParent(this);
    this.objectGroup = objectGroup;
};

Scene.prototype.onChangeSceneRange = function(x, y, width, height) {

    util.assert(!util.isNullOrUndefined(this.objectGroup), 'objectGroup should be initialized');

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.objectGroup.requestMeasureRange(width, height);
    this.objectGroup.requestChangePosition(x, y);

    if (this.objectGroup.getScrollableY()) {
        this.canvas.height = this.objectGroup.height;
        this.$canvas.css('height', this.objectGroup.height);
    }
    this.objectGroup.requestDraw();
};


//
// function Scene(canvasId) {
//   var self = this;
//   var canvas = self.canvas = document.getElementById(canvasId);
//
//   self.windSimulation = new WindSimulation();
//   self.ctx = canvas.getContext('2d');
//   self.data = null;
//   self.images = {};
//
//
//   $.getJSON('background.json', function( data ) {
//     self.data = data;
//     self.draw();
//     self.windSimulation.setListener(self, self.animationListener);
//     self.windSimulation.run();
//   });
// }
//
// Scene.prototype.draw = function() {
//   var self = this;
//   var keys = Object.keys(self.data.items);
//   var items = self.data.items;
//
//   for (var key of keys) {
//     var item = items[key];
//     var type = item.type;
//
//     if (type == 'image' || type == 'pattern') {
//       self.loadImage(key, type, item.src, item.count, item.dist, item.range, item.coordinates);
//     }
//   }
// }
//
// Scene.prototype.loadImage = function(key, type, src, count, dist, range, coordinates) {
//   var self = this;
//   if (self.images[src] == "" || self.images[src] == null || typeof self.images[src] == 'undefined') {
//     var image = new Image();
//     var self = this;
//
//     image.onload = function() {
//       self.images[src] = this;
//       if (type == 'image') {
//         self.drawImage(key, this, count, dist, range, coordinates);
//       } else if (type == 'pattern') {
//         self.drawPattern(key, this, range);
//       }
//     };
//     image.src = src;
//   } else {
//     if (type == 'image') {
//       self.drawImage(key, self.images[src], count, dist, range, coordinates);
//     } else if (type == 'pattern'){
//       self.drawPattern(key, self.images[src], range);
//     }
//   }
// };
//
// Scene.prototype.getPixelRange = function(range) {
//   var self = this;
//   if (isNullOrUndefined(rang)) {
//     return [self.canvas.width, self.canvas.height];
//   } else {
//     if (range.type == 'ratio') {
//       var width = isNullOrUndefined(range.width) ? 1.0 : range.width * self.canvas.width;
//       var height = isNullOrUndefined(range.height) ? 1.0 : range.height * self.canvas.height;
//       return [width, height];
//     } else if (range.type == 'absolute') {
//       return [range.width, range.height];
//     }
//   }
// };
//
// Scene.prototype.getCoordinates = function(align) {
//   var x, y;
//   if (isNullOrUndefined(align)) {
//     return [0, 0];
//   } else {
//     if (!isNullOrUndefined(align.to)) {
//
//     }
//   }
//   return [x, y];
// };
//
// Scene.prototype.drawPattern = function (key, image, range) {
//   var self = this;
//   var pattern = self.ctx.createPattern(image, 'repeat');
//   for (var start = 0; start < self.canvas.width; start += image.width) {
//     self.ctx.drawImage(image, start, self.canvas.height - image.height);
//   }
// };
//
// Scene.prototype.drawImage = function(key, image, count, dist, range, coordinates) {
//   var self = this;
//   if (coordinates != null && typeof coordinates != 'undefined') {
//     for (var i = 0; i < count; i++) {
//       var x = coordinates[i][0];
//       var y = coordinates[i][1];
//
//       self.ctx.drawImage(image, x, y);
//     }
//     return;
//   }
//
//   var coordinates = self.getPixelRange(range);
//   var top = coordinates[0];
//   var left = coordinates[1];
//   var bottom = coordinates[2];
//   var right = coordinates[3];
//
//   if (dist == 'random') {
//     self.data.items[key].coordinates = [];
//     for (var i = 0; i < count; i++) {
//       var x = Math.floor(Math.random() * (right - left)) + left;
//       var y = Math.floor(Math.random() * (top - bottom)) + bottom;
//
//       self.data.items[key].coordinates.push([x, y]);
//       self.ctx.drawImage(image, x, y);
//     }
//   } else if (dist == 'once') {
//     self.data.items[key].coordinates = [];
//     for (var i = 0; i < count; i++) {
//       var x = Math.floor(Math.random() * (right - left)) + left;
//       var y = Math.floor(Math.random() * (top - bottom)) + bottom;
//
//       self.data.items[key].coordinates.push([x, y]);
//       self.ctx.drawImage(image, x, y);
//     }
//   }
// };
//
// Scene.prototype.animationListener = function(dx, dy) {
//   var self = this;
//   var keys = Object.keys(self.data.items);
//   var items = self.data.items;
//   self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
//
//   for (var key of keys) {
//     var item = items[key];
//     var type = item.type;
//     var animateOption = item.animate;
//
//     if (animateOption == null || typeof animateOption == 'undefined') {
//       // no coordinates change
//       if (type == 'image') {
//         self.drawImage(key, self.images[item.src], item.count, item.dist, item.range, item.coordinates);
//       } else if (type == 'pattern') {
//         self.drawPattern(key, self.images[item.src], item.range);
//       }
//       continue;
//     }
//
//     var animateType = animateOption.type;
//
//     if (animateType == 'wind') {
//       if (type == 'image') {
//         for (var i = 0; i < item.count; i++) {
//           if (animateOption.dx) {
//             if (dx > 0) {
//               if (item.coordinates[i][0] > self.canvas.width) {
//                 item.coordinates[i][0] = -self.images[item.src].width - Math.random() * 10;
//               } else {
//                 item.coordinates[i][0] += dx * (0.5 / item.weight);  // x
//               }
//             } else {
//               if (item.coordinates[i][0] < -self.images[item.src].width) {
//                 item.coordinates[i][0] = self.canvas.width;
//               } else {
//                 item.coordinates[i][0] += dx * (0.5 / item.weight);  // x
//               }
//             }
//           }
//           if (animateOption.dy) {
//             if (item.coordinates[i][1] > self.canvas.height) {
//               // initialize start x, y
//               item.coordinates[i][1] = Math.random() * 10;
//               if (animateOption.dx) item.coordinates[i][0] = Math.random() * self.canvas.width;
//             } else {
//               item.coordinates[i][1] += dy * (0.5 / item.weight);  // y
//             }
//           }
//         }
//         self.drawImage(key, self.images[item.src], item.count, item.dist, item.range, item.coordinates);
//       }
//     }
//   }
// };
