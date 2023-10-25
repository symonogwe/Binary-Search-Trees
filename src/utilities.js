/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
function merge(arr1, arr2, originalArr) {
  let i = 0;
  let j = 0;
  let k = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      originalArr[k] = arr1[i];
      i++;
      k++;
    } else {
      originalArr[k] = arr2[j];
      j++;
      k++;
    }
  }

  while (i < arr1.length) {
    originalArr[k] = arr1[i];
    i++;
    k++;
  }

  while (j < arr2.length) {
    originalArr[k] = arr2[j];
    j++;
    k++;
  }

  return originalArr;
}

function mergeSort(arr) {
  if (arr.length === 1) return arr;

  const middle = Math.ceil(arr.length / 2);
  const middleToEnd = arr.length - middle;

  const subArr1 = arr.slice(0, middle);
  const subArr2 = arr.slice(-middleToEnd);

  const sorted1 = mergeSort(subArr1);
  const sorted2 = mergeSort(subArr2);
  return merge(sorted1, sorted2, arr);
}

export default function removeDuplicates(arr) {
  const sortedArr = mergeSort(arr);
  const newArr = sortedArr.filter(
    (item, index, self) => self.indexOf(item) === index
  );

  return newArr;
}
