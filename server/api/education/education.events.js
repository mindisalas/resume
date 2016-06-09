/**
 * Education model events
 */

'use strict';

import {EventEmitter} from 'events';
import Education from './education.model';
var EducationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EducationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Education.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EducationEvents.emit(event + ':' + doc._id, doc);
    EducationEvents.emit(event, doc);
    console.log('emitted EducationEvents.emit(event tick marks doc._id, doc)'); //todo remove
  }
}

export default EducationEvents;
