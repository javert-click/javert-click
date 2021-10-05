addEventListener('connect', function(e) {
    var passed;
    console.log('I am inside connect listener');
    console.log('location.hash: '+location.hash+', name: '+name);
    switch (location.hash) {
      case '#1': passed = name == ''; break;
      case '#2': passed = name == 'a'; break;
      case '#3': passed = name == '0'; break;
    }
    e.ports[0].postMessage(passed);
}, false);