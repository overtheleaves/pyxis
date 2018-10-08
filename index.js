var stage = require('stage');
var scene = require('scene');
var object = require('object');

var mystage = stage.New();
var sb = scene.New('background-scene');
var sl = scene.New('layout-scene');
var slcontext = sl.getContext();
var sbcontext = sb.getContext();

var linear = object.GroupFactory(slcontext,
    { range : { width: {type: 'ratio', value: 1.0},
    height: {type: 'ratio', value: 1.0} },
    type : 'linear',
    orientation : 'vertical',
    margin: {top: 10, left: 10, right: 10, bottom: 10},
    verticalMargin: 10,
    scrollableY: true});

var linear2 = object.GroupFactory(slcontext,
    { range : { width: {type: 'ratio', value: 1.0},
    height: {type: 'ratio', value: 1.0}},
    type : 'linear',
    orientation : 'vertical'});

var staggered = object.GroupFactory(slcontext,
    { range : { width: {type: 'ratio', value: 1.0},
    height: {type: 'ratio', value: 1.0} },
    type : 'staggered',
    column: 2,
    scrollableY: true,
    columnMargin: 10,
    rowMargin: 10,
    margin: {top: 10, left: 10, right: 10, bottom: 10}});

var shapeObject1 = object.Factory(sbcontext,
    { range : { width: {type: 'ratio', value: 1.0},
    height: {type: 'ratio', value: 1.0} },
    type : 'shape',
    shape : 'rect',
    fillStyle : '#b18bd6'});

var shapeObject2 = object.Factory(slcontext,
    { range : { width: {type: 'ratio', value: 1.0},
    height: {type: 'absolute', value: 100} },
    type : 'shape',
    shape : 'rect',
    fillStyle : '#00ABEB',
    margin: {top: 10, left: 10, right: 10}});

for (var i = 0; i < 30; i++) {
    var height = Math.floor(Math.random() * 200) + 50;
    var shapeObj = object.Factory(slcontext,
        { range : { width: {type: 'ratio', value: 1.0},
        height: {type: 'absolute', value: height} },
        type : 'shape',
        shape : 'rect',
        fillStyle : '#00ABEB'});

    linear.addChild(shapeObj);
}

linear2.addChild(shapeObject1);

sl.setObjectGroup(linear);
sb.setObjectGroup(linear2);

mystage.addScene(sb);
mystage.addScene(sl);

mystage.draw();
