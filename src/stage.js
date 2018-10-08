var util = require('util');

exports.New = function() {
    return new Stage();
};

var Stage = function() {
    this.scenes = [];
};

Stage.prototype.addScene = function(scene, index) {
    if (!util.isNullOrUndefined(index)) {
        util.assert(index >= 0 && index < this.scenes.length, 'array index out of bounds');

        for (var i = this.scenes.length - 1; i >= index; i--) {
            this.scenes[i+1] = this.scenes[i];
        }
        this.scenes[index] = scene;
    } else {
        this.scenes.push(scene);
    }
};

Stage.prototype.draw = function() {
    for (var i = 0; i < this.scenes.length; i++) {
        this.scenes[i].$canvas.css('z-index', i);
    }

    for (var i = 0; i < this.scenes.length; i++) {
        this.scenes[i].draw();
    }
}
