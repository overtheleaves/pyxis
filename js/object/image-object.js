/**
* ImageObject
*/
var BaseObject = require('js/object/base-object.js');
var util = require('js/util.js');

var ImageObject = function(context, attrs) {
    BaseObject.call(this, context, attrs);

    // assert
    util.assert(!util.isNullOrUndefined(attrs.src), 'ImageObject must have src');

    this.src = attrs.src;
    this.image = new Image();
};

util.inherit(ImageObject, BaseObject);

ImageObject.prototype.requestDraw = function() {
    var x = this.x;
    var y = this.y;
    var width = this.width;
    var height = this.height;
    var self = this;

    this.image.onload = function() {
        self.context.drawImage(self.image, x, y, width, height);
    };

    this.image.src = this.src;
};

exports = ImageObject;
