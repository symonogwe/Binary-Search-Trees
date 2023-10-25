/* eslint-disable class-methods-use-this */
import Node from "./Node";
import removeDuplicates from "./utilities";

class Tree {
  #privateSortedArr;

  constructor(array) {
    this.array = array;
    this.#privateSortedArr = removeDuplicates(this.array);
    this.root = this.buildTree(
      this.#privateSortedArr,
      0,
      this.#privateSortedArr.length - 1
    );
  }

  // buildTree method
  buildTree(array, start, end) {
    console.log(array);
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
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(newTree.root);
console.log(newTree.prettyPrint(newTree.root));
