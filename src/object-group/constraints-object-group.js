/**
* ConstraintsObjectGroup
*/
var BaseObject = require('object/base-object');
var BaseObjectGroup = require('object-group/base-object-group');
var util = require('util');
var Constraints = require('object-group/constants').Constraints;

var ConstraintsObjectGroup = function (context, attrs) {
    BaseObjectGroup.call(this, context, attrs);

    this.verticalMargin = util.isNullOrUndefined(attrs.verticalMargin) ? 0 : attrs.verticalMargin;
    this.horizontalMargin = util.isNullOrUndefined(attrs.horizontalMargin) ? 0 : attrs.horizontalMargin;
    this.objectTree = new ObjectTree();
};
util.inherit(ConstraintsObjectGroup, BaseObjectGroup);

ConstraintsObjectGroup.prototype.requestMeasureRange = function(parentWidth, parentHeight) {
    util.super(BaseObject, 'requestMeasureRange', this, parentWidth, parentHeight);

    var self = this;
    // traverse object tree
    this.objectTree.traverse(function(node) {
        var object = node.object;
        var children = node.children;
        var constraints = node.constraints;

        // calculate range
        var width = self.width;
        var height = self.height;

        for (var i = 0; i < children.length; i++) {
            var constraint = constraints[i];
            var child = children[i].object;
            if (constraint == Constraints.LEFT_OF || constraint == Constraints.RIGHT_OF) {
                width -= child.width;
                width = width < 0 ? 0 : width;
            }
            if (constraint == Constraints.TOP_OF || constraint == Constraints.BOTTOM_OF) {
                height -= child.height;
                height = height < 0 ? 0 : height;
            }
        }

        console.log('width = ' + width + ' height = ' + height);
        object.requestMeasureRange(width, height);
    });
};

ConstraintsObjectGroup.prototype.requestChangePosition = function(x, y) {
    util.super(BaseObject, 'requestChangePosition', this, x, y);

    var self = this;
    // traverse object tree
    this.objectTree.traverse(function(node) {
        var object = node.object;
        var children = node.children;
        var constraints = node.constraints;

        // calculate position
        var x = self.x;
        var y = self.y;

        for (var i = 0; i < children.length; i++) {
            var constraint = constraints[i];
            var child = children[i].object;

            switch (constraint) {
                case Constraints.RIGHT_OF:
                    x += child.width;
                    break;

                case Constraints.BOTTOM_OF:
                    y += child.height;
                    break;

                case Constraints.RIGHT_PARENT:
                    x = self.width - object.width;
                    break;
            }
        }

        console.log('x = ' + x + ' y = ' + y);
        object.requestChangePosition(x, y);
    });
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
    this.visited = [];                  // visted mark array (for traverse)
    this.parent = new ObjectTreeNode(); // virtual parent
};

ObjectTree.prototype.traverse = function(callback) {
    this.visited = [];
    this._traverse(this.root, callback);
};

ObjectTree.prototype._traverse = function(node, callback) {
    // cycle detected
    util.assert(util.isNullOrUndefined(node.object) || !this.visited[node.object.id], "object tree has cycle");

    if (!util.isNullOrUndefined(node.object))
        this.visited[node.object.id] = true;

    // visit children
    for (var child of node.children) {
        this._traverse(child, callback);
    }

    // invoke callback when nodes are not vitrual
    if (node != this.root && node != this.parent) callback(node);
};

ObjectTree.prototype.addRootChild = function(childObject) {
    var childTreeNode = new ObjectTreeNode(childObject);
    this.root.addChild(childTreeNode, null);
    this.nodes[childObject.id] = childTreeNode;
};

ObjectTree.prototype.addChild = function(targetObject, constraint, otherObject) {

    if (util.isNullOrUndefined(otherObject)) {
        // dependant on parent
        var targetTreeNode = this.nodes[targetObject.id];
        targetTreeNode.addChild(this.parent, constraint);
    } else {
        this.root.removeChildById(otherObject.id);

        var targetTreeNode = this.nodes[targetObject.id];
        var otherTreeNode = this.nodes[otherObject.id];

        if (util.isNullOrUndefined(targetTreeNode)) {
            targetTreeNode = this.nodes[targetObject.id] = new ObjectTreeNode(targetObject);
        }

        if (util.isNullOrUndefined(otherTreeNode))
            otherTreeNode = this.nodes[otherObject.id] = new ObjectTreeNode(otherObject);

        targetTreeNode.addChild(otherTreeNode, constraint);
    }
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
