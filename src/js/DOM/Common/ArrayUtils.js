/*
* @id initArrayUtils
*/
var initArrayUtils = function(){

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

	return {'find': find, 'index': index, 'filter': filter, 'map': map};
};

module.exports = initArrayUtils;

