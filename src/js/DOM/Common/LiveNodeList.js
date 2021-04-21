/***********************/
/* INTERFACE NODE LIST */
/***********************/

/**
 * @id LiveNodeList
 */
var LiveNodeList = function (f, lazy){
	this.__compute  = f; 
	this.__computed = null; 
	this.__lazy     = (lazy === true); 
	LiveNodeList.counter = (LiveNodeList.counter || 0) + 1;   
	this.id = LiveNodeList.counter; 
};

LiveNodeList.prototype.computedLiveNodeLists = [];

/**
 * The contents of the live node list depend of the parameter function. 
 * When necessary, the list is updated (by run the function again) and the result
 * is returned. This is useful, for instance, for the getElementsByTagName function.
 */
Object.defineProperty(LiveNodeList.prototype, "contents", {
	/*
	* @id LiveNodeListContentsGet
	*/
	get:function () {
		if (!this.__lazy && (this.__computed)) {
			return this.__computed;  
		} else {  
			if(!this.computedLiveNodeLists[this.id]){
				var ret = this.__compute();
				this.__computed = ret; 
				this.computedLiveNodeLists[this.id] = ret;
				return ret; 
			} else {
				return this.computedLiveNodeLists[this.id];
			}
		}	
	}
}); 

Object.defineProperty(LiveNodeList.prototype, "length", {
	/*
	* @id LiveNodeListLength
	*/
	get:	function () { return this.contents.length;  }
}); 


/**
* @id LiveNodeListItem
*/
LiveNodeList.prototype.item = function (index){
	var child = this.contents[index];
	var item;
	if(child){
		item = child;
	}else{
		item = null;
	}
	return item;
};

/**
 * @id LiveNodeListObserve
 */
LiveNodeList.prototype.observe = function () { 
	this.__computed = null; 
	this.computedLiveNodeLists[this.id] = null;
}

/*
* @id LiveNodeListRecompute
*/
LiveNodeList.prototype.recompute = function () { 
	for (var i = 0; i < this.computedLiveNodeLists.length ; i++) { 
		this.computedLiveNodeLists[i] = undefined; 
	}
};

exports.LiveNodeList = LiveNodeList;

