const DOMException = require('../../DOM/Common/DOMException');

// TODOMP: I believe these 2 functions below are not necessary. The has been shipped flag seems to be used only for scheduling the messages.
// We are handling this at the level of the MP-Semantics
/*
* @id MessagePortTransferSteps
*/
function TransferSteps(value, dataHolder){
    // 1. Set value's has been shipped flag to true.
    value.__HasBeenShipped = true;
    // 2. (MP-Semantics) Set dataHolder.[[PortMessageQueue]] to value's port message queue.
    // 3. (MP-Semantics) If value is entangled with another port remotePort, then:
        // 3.1. Set remotePort's has been shipped flag to true. TODO: how can we do this?
        // 3.2. Set dataHolder.[[RemotePort]] to remotePort.
    // 4. Otherwise, set dataHolder.[[RemotePort]] to null.
}

/*
* @id MessagePortTransferReceivingSteps
*/
function TransferReceivingSteps(value){
    // 1. Set value's has been shipped flag to true.
    value.__HasBeenShipped = true;
    // 2. (MP-Semantics) Move all the tasks that are to fire message events in dataHolder.[[PortMessageQueue]] to the port message queue of value, 
        // if any, leaving value's port message queue in its initial disabled state, and, if value's relevant global object is a Window, 
        // associating the moved tasks with value's relevant global object's associated Document.
    // 3. (ALSO NOT NECESSARY) If dataHolder.[[RemotePort]] is not null, then entangle dataHolder.[[RemotePort]] and value. 
        // (This will disentangle dataHolder.[[RemotePort]] from the original port that was transferred.)
}

/*
* @id StructuredSerializeWithTransfer
*/
function StructuredSerializeWithTransfer(message, transfer){
    // 1. Let memory be an empty map *)
    var memory = {};
    // 2. For each transferable of transferList: 
    transfer.map(transferable => {
      // 2.1 (NOT SUPPORTED) If transferable has neither an [[ArrayBufferData]] internal slot ...
      // 2.2 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot and ... 
      // 2.3  If memory[transferable] exists, then throw a "DataCloneError" DOMException. 
      if(memory[transferable.__id]) throw new DOMException.DOMException(DOMException.DATA_CLONE_ERR);
      // 2.4 Set memory[transferable] to { [[Type]]: an uninitialized value }.
      memory[transferable.__id] = {'Type': undefined};
    });
    // 3. Let serialized be ? StructuredSerializeInternal(value, false, memory).
    var datacloneerr = new DOMException.DOMException(DOMException.DATA_CLONE_ERR);
    var serialiazed = StructuredSerializeInternal(message, false, datacloneerr);
    // 4. Let transferDataHolders be a new empty List.
    // 5. For each transferable of transferList:
    transfer.map(transferable => {
        // 5.1 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot and ! IsDetachedBuffer(transferable) is true, then throw a "DataCloneError" DOMException.
        // 5.2 If transferable has a [[Detached]] internal slot and transferable.[[Detached]] is true, then throw a "DataCloneError" DOMException.
        if (transferable.__Detached == true) throw new DOMException.DOMException(DOMException.DATA_CLONE_ERR);
        // 5.3 (MP-Semantics) Let dataHolder be memory[transferable].
        // 5.4 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot, then:

    });
    // Note: the StructuredSerializeInternal function is a JSIL function, found in ml/JS2JSIL/MP_runtime/Serialization.jsil
    // Note: we skip the steps (4-5) related to transferDataHolders, as we are handling this in the MP semantics.
    return serialiazed;
}

/*
* @id StructuredDeserializeWithTransfer
*/
function StructuredDeserializeWithTransfer(message, transferIds, MessagePort){
    // 1. Let memory be an empty map.
    // This step is performed during StructuredDeserialize (at the JSIL level)
    // 2. Let transferredValues be a new empty List.
    var transferredValues = [];
    // 3. For each transferDataHolder of serializeWithTransferResult.[[TransferDataHolders]]:
    transferIds.map ((transferId) => {
        // 3.1 Let value be an uninitialized value.
        var value;
        // 3.2 (NOT SUPPORTED) If transferDataHolder.[[Type]] is "ArrayBuffer", then set value to a new ArrayBuffer object in ...
        // 3.3 Otherwise:
           // 3.3.1 (NOT SUPPORTED) Let interfaceName be transferDataHolder.[[Type]].
           // 3.3.2 (NOT SUPPORTED) If the interface identified by interfaceName is not exposed in targetRealm, then throw a "DataCloneError" DOMException.
           // 3.3.3 Set value to a new instance of the interface identified by interfaceName, created in targetRealm.
           value = new MessagePort(transferId);
           // 3.3.4 Perform the appropriate transfer-receiving steps for the interface identified by interfaceName given transferDataHolder and value.
           TransferReceivingSteps(value);
           // 3.4 (NOT SUPPORTED) Set memory[transferDataHolder] to value.
        // 3.5 Append value to transferredValues.
        transferredValues.push(value);
    });
    // 4. Let deserialized be ? StructuredDeserialize(serializeWithTransferResult.[[Serialized]], targetRealm, memory).
    var deserialized = StructuredDeserialize(message);
    // 5. Return { [[Deserialized]]: deserialized, [[TransferredValues]]: transferredValues }.
    return { 'Deserialized': deserialized, 'TransferredValues': transferredValues };
}

exports.StructuredSerializeWithTransfer = StructuredSerializeWithTransfer;
exports.StructuredDeserializeWithTransfer = StructuredDeserializeWithTransfer;