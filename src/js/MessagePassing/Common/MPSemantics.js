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
MPSemantics.prototype.send = function(message, plist, orig_port, dest_port, event){
    //console.log('MPSem: send');
    var mplist = JS2JSILList.JS2JSILList(message); 
    var plistJSIL = JS2JSILList.JS2JSILList(plist);
    __MP__wrapper__send(mplist, plistJSIL, orig_port, dest_port, event);
}

MPSemantics.prototype.sendSync = function(message, orig_port, fid){
    __MP__wrapper__send_sync(message, orig_port, fid);
}

/*
* @id MPSemanticsCreate
*/
MPSemantics.prototype.create = function(url, setup_fid, xargs){
    //console.log('MPSem: create, outsideportid: '+outsidePortId);
    var main_fid = "main"+url.substring(0, url.length - 3);
    xargs.push(main_fid);
    var argslist = JS2JSILList.JS2JSILList(xargs); 
    return __MP__wrapper__create(url, setup_fid, argslist);
}

/*
* @id MPSemanticsPairPorts
*/
MPSemantics.prototype.pairPorts = function(port1Id, port2Id){
    /*this.unpairPort(port1Id);
    this.unpairPort(port2Id);*/
    //console.log('MPSem: pairing '+port1Id+' and '+port2Id);
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
* @id MPSemanticsGetPairedPort
*/
MPSemantics.prototype.getPairedPort = function(portId){
    //console.log('MPSem: getPaired');
    var paired_ports = __MP__wrapper__getPaired(portId);
    paired_ports = JS2JSILList.JSILListToArray(paired_ports);
    //console.log('MPSem returned '+paired_port+' as getPaired of '+portId);
    return paired_ports && paired_ports.length > 0 ? paired_ports[0] : null;
}

/*
* @id MPSemanticsGetAllPairedPorts
*/
MPSemantics.prototype.getAllPairedPorts = function(portId){
    var paired_ports = __MP__wrapper__getPaired(portId);
    paired_ports = JS2JSILList.JSILListToArray(paired_ports);
    return paired_ports;
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