const MessagePort = require('./MessagePort');
const MPSemantics = require('../Common/MPSemantics');

var MPSem = MPSemantics.getMPSemanticsInstance();

/*
* @id MessageChannel
*/
function MessageChannel(){
    // 1. Set this's port 1 to a new MessagePort in this's relevant Realm.
    this.__port1 = new MessagePort.PublicMessagePort();
    // 2. Set this's port 2 to a new MessagePort in this's relevant Realm.
    this.__port2 = new MessagePort.PublicMessagePort();
    // 3. Entangle this's port 1 and this's port 2.
    MPSem.pairPorts(this.__port1.__id, this.__port2.__id);
}

Object.defineProperty(MessageChannel.prototype, 'port1', {
    /*
    * @id MessageChannelGetPort1
    */
    get: function(){
        // The port1 getter steps are to return this's port 1.
        return this.__port1;
    }
});

Object.defineProperty(MessageChannel.prototype, 'port2', {
    /*
    * @id MessageChannelGetPort2
    */
    get: function(){
        // The port2 getter steps are to return this's port 2.
        return this.__port2;
    }
});

exports.MessageChannel = MessageChannel;