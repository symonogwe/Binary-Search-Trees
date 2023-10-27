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
    // base case
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

newTree.delete(8);
newTree.prettyPrint(newTree.root);
