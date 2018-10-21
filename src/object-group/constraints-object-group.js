/**
* ConstraintsObjectGroup
*/
var BaseObject = require('object/base-object');
var BaseObjectGroup = require('object-group/base-object-group');
var util = require('util');

var Constraint = {
    LEFT_OF: 0,
    RIGHT_OF: 1,
    TOP_OF: 2,
    BOTTOM_OF: 3,
    LEFT_PARENT: 4,
    RIGHT_PARENT: 5,
    TOP_PARENT: 6,
    BOTTOM_PARENT: 7,
    VERTICAL_CENTER_PARENT: 8,
    HORIZONTAL_CENTER_PARENT: 9
};

var ConstraintsObjectGroup = function (context, attrs) {
    BaseObjectGroup.call(this, context, attrs);

    this.verticalMargin = util.isNullOrUndefined(attrs.verticalMargin) ? 0 : attrs.verticalMargin;
    this.horizontalMargin = util.isNullOrUndefined(attrs.horizontalMargin) ? 0 : attrs.horizontalMargin;
    this.objectTree = new ObjectTree();
};
util.inherit(ConstraintsObjectGroup, BaseObjectGroup);

ConstraintsObjectGroup.prototype.requestMeasureRange = function(parentWidth, parentHeight) {
    util.super(BaseObject, 'requestMeasureRange', this, parentWidth, parentHeight);

    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        c.requestMeasureRange(this.width, this.height);
    }
};

ConstraintsObjectGroup.prototype.requestChangePosition = function(x, y) {
    util.super(BaseObject, 'requestChangePosition', this, x, y);

    x = this.x;
    y = this.y;

    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        c.requestChangePosition(x, y);
    }
};

ConstraintsObjectGroup.prototype.addChild = function(child) {
    util.super(BaseObjectGroup, 'addChild', this, child);
    this.objectTree.addRootChild(child);
    console.log(this.objectTree.root);
};

ConstraintsObjectGroup.prototype.addConstraint = function(target, constraint, other) {
    this.objectTree.addChild(target, constraint, other);
    console.log(this.objectTree.root);
};

ConstraintsObjectGroup.prototype.requestDraw = function () {
    util.super(BaseObjectGroup, 'requestDraw', this);
};

var ObjectTree = function() {
    this.root = new ObjectTreeNode();   // virtual root node
    this.nodes = {};                    // node references for finding quickly
};

ObjectTree.prototype.addRootChild = function(childObject) {
    var childTreeNode = new ObjectTreeNode(childObject);
    this.root.addChild(childTreeNode, null);
    this.nodes[childObject.id] = childTreeNode;
};

ObjectTree.prototype.addChild = function(targetObject, constraint, otherObject) {

    this.root.removeChildById(otherObject.id);

    var targetTreeNode = this.nodes[targetObject.id];
    var otherTreeNode = this.nodes[otherObject.id];

    if (util.isNullOrUndefined(targetTreeNode)) {
        targetTreeNode = this.nodes[targetObject.id] = new ObjectTreeNode(targetObject);
    }

    if (util.isNullOrUndefined(otherTreeNode))
        otherTreeNode = this.nodes[otherObject.id] = new ObjectTreeNode(otherObject);

    targetTreeNode.addChild(otherTreeNode, constraint);
};

var ObjectTreeNode = function(object) {
    this.object = object;
    this.children = [];
    this.constraints = [];
};

ObjectTreeNode.prototype.addChild = function(childTreeNode, constraint) {
    this.children.push(childTreeNode);
    this.constraints.push(constraint);
};

ObjectTreeNode.prototype.removeChildById = function(id) {
    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i].object;
        if (child.id == id) break;
    }

    if (i < this.children.length) {
        this.children = this.children.slice(0, i).concat(this.children.slice(i+1));
        this.constraints = this.constraints.slice(0, i).concat(this.constraints.slice(i+1));
    }
};

module.exports = ConstraintsObjectGroup;
