

/*
* @id find
*/
function find(array, f){
	for(var i = 0; i < array.length; i++){
		if(f(array[i])){
			return array[i];
		}
	}
	return null;
}

/*
* @id index
*/
function index(array, f){
	for(var i = 0; i < array.length; i++){
		if(f(array[i])){
			return i;
		}
	}
	return -1;
}

/*
* @id filter
*/
function filter(array, f){
	var res = [];
	for(var i = 0; i < array.length; i++){
		if(f(array[i])){
			res.push(array[i]);
		}
	}
	return res;
}

/*
* @id map
*/
function map(array, f){
	var res = [];
	for(var i = 0; i < array.length; i++){
		res.push(f(array[i]));
	}
	return res;
}

 /**
   * Auxiliary iteration functions:
   *  1) ArrayIterator: constructor, ArrayIterator.prototype.next
   *  2) Array.prototype.getIterator
   */

  /* @id p_aux__ArrayIterator */
  function ArrayIterator (arr) {
    this.__arr = arr;
    this.__index = 0
    return this
  }

  /* @id p_aux__proto_next */
  ArrayIterator.prototype.next = function () {
    var index = this.__index;
    var arr = this.__arr;
    if (index < arr.length) {
      this.__index++;
      return { value: arr[index], done: false }
    } else {
      return { done: true }
    }
  }

exports.find = find;
exports.filter = filter;
exports.map = map;
exports.index = index;
exports.ArrayIterator = ArrayIterator;
