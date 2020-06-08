/***********************/
/* INTERFACE NODE LIST */
/***********************/

/*
 * @id initNodeList
 */
var initNodeList = function(){

	/*
	* @id NodeList
	*/
	var NodeList = function (){
	    this.length    = 0;
		this.contents  = [];
	};

	/*
	* @id item
	*/
	NodeList.prototype.item = function (index){
		var child = this.contents[index];
		if(child){
			return child;
		}else{
			return null;
		}
	};

	/*
	* @id addItem
	*/
	NodeList.prototype.addItem = function (node){
	    this.contents.push(node);
	    this.length++;
	};

    /*
    * @id splice
    */
	NodeList.prototype.splice = function (i, j, node){
		this.contents.splice(i, j, node);
		this.length = this.contents.length;
	};

    /*
    * @id removeItem
    */
	NodeList.prototype.removeItem = function (i, j){
		this.contents.splice(i, j);
		this.length--;
	}

    /*
    * @id sort
    */
	NodeList.prototype.sort = function(f){
		var nlrev = new NodeList();
		nlrev.contents = this.contents.sort(f);
		nlrev.length = this.length;
		return nlrev;
	}

	return {'NodeList': NodeList};

};


module.exports = initNodeList;

