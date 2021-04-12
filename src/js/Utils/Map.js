import { ArrayIterator } from './ArrayUtils';

function Map(kvpairs){
    this.kvpairs = kvpairs ? kvpairs : [];
}

Object.defineProperty(Map.prototype, 'length', {
    get: function(){
        return this.kvpairs.length;
    }
});

Map.prototype.get = function(key){
    for(var i = 0; i < this.kvpairs.length; i++){
        var kvp = this.kvpairs[i];
        if(kvp[0] === key) return kvp[1];
    }
}

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

Map.prototype.values = function(){
    var values = [];
    for(var i = 0; i < this.kvpairs.length; i++){
        values.push(this.kvpairs[i][1]);
    }
    return new ArrayIterator(values);
}

Map.prototype.entries = function(){
    return new ArrayIterator(this.kvpairs);
}

export { Map }


