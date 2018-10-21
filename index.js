var stage = require('stage');
var scene = require('scene');
var object = require('object');
var objectGroup = require('object-group');

var mystage = stage.New();
var sb = scene.New('background-scene');
var sl = scene.New('layout-scene');
var sc = scene.New('constraints-scene');
var slcontext = sl.getContext();
var sbcontext = sb.getContext();
var sccontext = sc.getContext();

var linear = objectGroup.GroupFactory(slcontext,
    {
        range : { width: {type: 'ratio', value: 1.0},
        height: {type: 'ratio', value: 1.0} },
        type : 'linear',
        orientation : 'vertical',
        margin: {top: 10, left: 10, right: 10, bottom: 10},
        verticalMargin: 10,
        scrollableY: true
    });

var linear2 = objectGroup.GroupFactory(slcontext,
    {
        range : { width: {type: 'ratio', value: 1.0},
        height: {type: 'ratio', value: 1.0}},
        type : 'linear',
        orientation : 'vertical'
    });

var staggered = objectGroup.GroupFactory(slcontext,
    {
        range : { width: {type: 'ratio', value: 1.0},
                height: {type: 'ratio', value: 1.0} },
        type : 'staggered',
        column: 2,
        scrollableY: true,
        columnMargin: 10,
        rowMargin: 10,
        margin: {top: 10, left: 10, right: 10, bottom: 10
    }});

var constraints = objectGroup.GroupFactory(sccontext,
    {
        type: 'constraints',
        range : { width: {type: 'ratio', value: 1.0},
                height: {type: 'ratio', value: 1.0} }
    });

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
constraints.addChild(shapeObject1);
constraints.addConstraint(shapeObject1, 0, shapeObject2);

sl.setObjectGroup(linear);
sb.setObjectGroup(linear2);
sc.setObjectGroup(constraints);

mystage.addScene(sb);
mystage.addScene(sl);
mystage.addScene(sc);

mystage.draw();
