console.log('WORKER: running script')

function evalExpr(expr){
    //if(expr === null) return expr;
    switch (expr.op){
        case '+': return expr.operand1 + expr.operand2;
        case '-': return expr.operand1 - expr.operand2;
        case '*': return expr.operand1 * expr.operand2;
        case '/': return expr.operand1 / expr.operand2;
        default: return expr;
    }
}

onmessage = (e) => {
    console.log('WORKER: received msg ');
    var expr = e.data;
    try{
      var res = evalExpr(expr);
      var response = {status: 'SUCCESS', result: res};
      console.log('WORKER: posting success message back to main');
      postMessage(response);
    } catch(e){
      var response = {status: 'ERROR', result: e};
      console.log('WORKER: posting error message back to main');
      postMessage(response);
    }
}
console.log('WORKER: finished running script');