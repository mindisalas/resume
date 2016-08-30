/**
 * PersonInfo model events
 */

'use strict';

import {EventEmitter} from 'events';
import PersonInfo from './personInfo.model';
var PersonInfoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PersonInfoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PersonInfo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PersonInfoEvents.emit(event + ':' + doc._id, doc);
    PersonInfoEvents.emit(event, doc);
    console.log('emitted PersonInfoEvents.emit(event tick marks doc._id, doc)'); //todo remove
  }
}

export default PersonInfoEvents;
