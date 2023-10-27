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
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(newTree.root);
newTree.prettyPrint(newTree.root);

console.log(
  "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);

newTree.insert(2);
newTree.insert(363747);
newTree.prettyPrint(newTree.root);
