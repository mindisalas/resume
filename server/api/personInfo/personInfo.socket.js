/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import PersonInfoEvents from './personInfo.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('personInfo:' + event, socket);

    PersonInfoEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
    console.log("personInfo.socket.js socket.emit");  //todo remove console
  };
}

function removeListener(event, listener) {
  return function() {
    PersonInfoEvents.removeListener(event, listener);
  };
}
