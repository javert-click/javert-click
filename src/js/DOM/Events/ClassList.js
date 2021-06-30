const ArrayUtils = require('../../Utils/ArrayUtils');
const StringUtils = require('../../Utils/ArrayUtils');
    
/*
* @id ClassList
*/
var ClassList = function(style){
    this.__style = style; 
    this.contents = [];
};

/*
* @id ClassListAdd
*/
ClassList.prototype.add = function(className){
    if (className === "animate") this.__style.animate(); 
    
    if(!this.contains(className)){
        this.contents.push(className);
    }
};

/*
* @id ClassListRemove
*/
ClassList.prototype.remove = function(className){
    var index = ArrayUtils.index(this.contents, function(c){
        return c === className;
    });
    if(index !== -1){
        this.contents.splice(index, 1);
    }
};

/*
* @id ClassListRemoveAll
*/
ClassList.prototype.removeAll = function(){
    this.contents = [];
}

/*
* @id ClassListContains
*/
ClassList.prototype.contains = function(className){
    var index = ArrayUtils.index(this.contents, function(c1){
        var classes = StringUtils.split(c1, ", ");
        return ArrayUtils.filter(classes, function(c2){
            return c1 === c2;
        }).length > 0;
    });
    return index !== -1;
};

/*
* @id ClassListItem
*/
ClassList.prototype.item = function(index){
    if (index < 0 || index >= this.contents.length){
        return null;
    }
    return this.contents[index];
};

/*
* @id ClassListToggle
*/
ClassList.prototype.toggle = function(className, toggle){
    if(toggle === undefined){
        if(this.contains(className)){
            this.remove(className);
            return false;
        }else{
            this.add(className);
            return true;
        }
    }else{
        if(toggle === true){
            this.add(className);
        }else if (toggle === false){
            this.remove(className);
        }
    }
}

/*
* @id ClassListLength
*/
ClassList.prototype.length = function(){
    return this.contents.length;
};

exports.ClassList = ClassList;



