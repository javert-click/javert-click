const ArrayUtils = require('./ArrayUtils');
const ArrayIterator = ArrayUtils.ArrayIterator;

function Map(kvpairs){
    this.kvpairs = kvpairs ? kvpairs : [];
}

Object.defineProperty(Map.prototype, 'size', {
    get: function(){
        return this.kvpairs.length;
    }
});

/*
* @id MapGet
*/
Map.prototype.get = function(key){
    for(var i = 0; i < this.kvpairs.length; i++){
        var kvp = this.kvpairs[i];
        if(kvp[0] === key) return kvp[1];
    }
}

/*
* @id MapSet
*/
Map.prototype.set = function(k, v){
    var found = false;
    var i = 0;
    while(i < this.kvpairs.length && !found){
        var kvp = this.kvpairs[i];
        if(kvp[0] === k){
            this.kvpairs[i][1] = v;
            found = true;
        } 
        i++;
    }
    if(!found) this.kvpairs.push([k, v]);
}

/*
* @id MapValues
*/
Map.prototype.values = function(){
    var values = [];
    for(var i = 0; i < this.kvpairs.length; i++){
        values.push(this.kvpairs[i][1]);
    }
    return new ArrayIterator(values);
}

/*
* @id MapEntries
*/
Map.prototype.entries = function(){
    return new ArrayIterator(this.kvpairs);
}

/*
* @id MapDelete
*/
Map.prototype.delete = function(k){
    var old = this.kvpairs.slice();
    this.kvpairs = this.kvpairs.filter((kvp) => { return kvp[0] !== k });
    return old.length > this.kvpairs.length;
}

exports.Map = Map;


