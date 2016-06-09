/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import EducationEvents from './education.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('education:' + event, socket);

    EducationEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
    console.log("education.socket.js socket.emit");  //todo remove console
  };
}

function removeListener(event, listener) {
  return function() {
    EducationEvents.removeListener(event, listener);
  };
}
