const JS2JSILList = require('../../Utils/JS2JSILList');
const EventsSemantics = require('../../DOM/Events/EventsSemantics');

/*
* @id MPSemantics
*/
function MPSemantics(){
    this.ESem = new EventsSemantics.EventsSemantics();
    this.ESem.addHandler("Message", "ProcessMessage", "processMessageSteps");
}

var MPSem;

function getMPSemanticsInstance(){
    if(!MPSem){
        MPSem = new MPSemantics();
    }
    return MPSem;
}

/*
* @id MPSemanticsNewPort
*/
MPSemantics.prototype.newPort = function(){
    return __MP__wrapper__newPort();
}

/*
* @id MPSemanticsSend
*/
MPSemantics.prototype.send = function(message, plist, orig_port, dest_port, isWindow){
    //console.log('MPSem: send');
    var mplist = JS2JSILList.JS2JSILList([message, dest_port, isWindow]); 
    var plistJSIL = JS2JSILList.JS2JSILList(plist);
    __MP__wrapper__send(mplist, plistJSIL, orig_port, dest_port);
}

/*
* @id MPSemanticsCreate
*/
MPSemantics.prototype.create = function(url, setup_fid, outsidePortId, isShared){
    //console.log('MPSem: create, outsideportid: '+outsidePortId);
    var main_fid = "main"+url.substring(0, url.length - 3);
    var argslist = JS2JSILList.JS2JSILList([url, outsidePortId, isShared, main_fid]); 
    return __MP__wrapper__create(url, setup_fid, argslist);
}

/*
* @id MPSemanticsPairPorts
*/
MPSemantics.prototype.pairPorts = function(port1Id, port2Id){
    this.unpairPort(port1Id);
    this.unpairPort(port2Id);
    //console.log('MPSem: pair');
    __MP__wrapper__pairPorts(port1Id, port2Id);
}

/*
* @id MPSemanticsUnpairPorts
*/
MPSemantics.prototype.unpairPort = function(portId){
    //console.log('MPSem: unpair');
    __MP__wrapper__unpairPort(portId);
}

/*
* @id MPSemanticsGetPaired
*/
MPSemantics.prototype.getPaired = function(portId){
    //console.log('MPSem: getPaired');
    var paired_port = __MP__wrapper__getPaired(portId);
    console.log('MPSem returned '+paired_port+' as getPaired of '+portId);
    return paired_port;
}

/*
* @id MPSemanticsTerminate
*/
MPSemantics.prototype.terminate = function(confId){
    return __MP__wrapper__terminate(confId);
}

/*
* @id MPSemanticsBeginAtomic
*/
MPSemantics.prototype.beginAtomic = function(){
    return __MP__wrapper__beginAtomic();
}  

/*
* @id MPSemanticsEndAtomic
*/
MPSemantics.prototype.endAtomic = function(){
    return __MP__wrapper__endAtomic();
} 

exports.getMPSemanticsInstance = getMPSemanticsInstance;