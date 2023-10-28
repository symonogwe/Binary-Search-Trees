/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Node from "./Node";
import removeDuplicates from "./utilities";

class Tree {
  #privateSortedArr;

  constructor(array) {
    this.#privateSortedArr = removeDuplicates(array);

    this.root = this.buildTree(
      this.#privateSortedArr,
      0,
      this.#privateSortedArr.length - 1
    );
  }

  // buildTree method
  buildTree(array, start, end) {
    if (array === null || start > end) return null;

    const mid = Math.ceil((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  // prettyPrint method
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // insert method calls the recursiveInsert()
  insert(value) {
    this.root = this._recursiveInsert(this.root, value);
  }

  _recursiveInsert(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this._recursiveInsert(root.left, value);
    } else if (value > root.data) {
      root.right = this._recursiveInsert(root.right, value);
    }

    return root;
  }

  // delete method
  delete(value) {
    this.root = this._recursiveDelete(this.root, value);
  }

  _recursiveDelete(root, value) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this._recursiveDelete(root.left, value);
    } else if (value > root.data) {
      root.right = this._recursiveDelete(root.right, value);
    } else {
      // node to be deleted is found

      // node with one child/ no child
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      // node with 2 children: get the in-order successor (smallest in right subtree)
      root.data = this._minValueNode(root.right);

      // delete the in-order successor
      root.right = this._recursiveDelete(root.right, root.data);
    }
    return root;
  }

  _minValueNode(root) {
    let current = root;

    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  // find method
  find(value) {
    return this._find(this.root, value);
  }

  _find(root, value) {
    if (root === null || root.data === value) return root;

    if (value < root.data) {
      return this._find(root.left, value);
    }
    return this._find(root.right, value);
  }

  // level order method
  levelOrder(callback = null) {
    const queue = [this.root];

    if (callback === null) {
      const arr = [];
      while (queue.length > 0) {
        const current = queue.shift();

        arr.push(current.data);
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
      }
      return arr;
    }
    while (queue.length > 0) {
      const current = queue.shift();

      callback(current);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  // in-order method
  inOrder(root, callback = null) {
    const dataArr = [];

    function traversal(node) {
      if (node === null) return;

      traversal(node.left);
      if (callback) {
        callback(node.data);
      } else {
        dataArr.push(node.data);
      }
      traversal(node.right);
    }

    traversal(root);
    return dataArr;
  }

  // pre-order method
  preOrder(root, callback = null) {
    const dataArr = [];

    function traversal(node) {
      if (node === null) return;

      if (callback) {
        callback(node.data);
      } else {
        dataArr.push(node.data);
      }

      traversal(node.left);
      traversal(node.right);
    }

    traversal(root);
    return dataArr;
  }

  // height method
  height(root) {
    if (root === null) return -1;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  // depth method
  depth(node, target, depth = 0) {
    if (node === null) return -1;
    if (node === target) return depth;

    const leftDepth = this.depth(node.left, target, depth + 1);
    const rightDepth = this.depth(node.right, target, depth + 1);

    if (leftDepth >= 0) {
      return leftDepth;
    }
    if (rightDepth >= 0) {
      return rightDepth;
    }
    return -1;
  }
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(newTree.root);
newTree.prettyPrint(newTree.root);

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

newTree.insert(2);
newTree.insert(363747);
newTree.prettyPrint(newTree.root);

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

newTree.delete(5);
newTree.prettyPrint(newTree.root);

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

console.log(newTree.find(6345));

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

console.log(newTree.levelOrder());

console.log(
  newTree.levelOrder((value) => {
    console.log(value.data * 2);
  })
);

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

console.log(newTree.inOrder(newTree.root));

newTree.inOrder(newTree.root, (value) => {
  console.log(value * 2);
});

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

console.log(newTree.preOrder(newTree.root));

newTree.inOrder(newTree.root, (value) => {
  console.log(value * 2);
});

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

console.log(newTree.height(newTree.root));

console.log(
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

const nodeDepth = newTree.find(2);
console.log(nodeDepth);

console.log(newTree.depth(newTree.root, nodeDepth));
