/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/


let listeners = [];

/**
 * Add an event handler to the listener list
 * @param {string} name 
 * @param {function (evt, arg)} handler - a function that accepts two parameters, evt and arg
 */
export function subscribeEvent(name, handler) {
  console.log(`event: "${name}" subscribed`)
  listeners.push({
    name,
    handler
  });
}

/**
 * Remove an event handler from the listener list
 * @param {string} name 
 */
export function unsubscribeEvent(name, handler) {
  const newListeners = listeners.filter(l => !(l.name === name && l.handler === handler));
  if(newListeners.length !== listeners.length) {
    console.log(`event: "${name}" unsubscribed`)
    listeners = newListeners
  } else {
    console.log(`event: failed to unsubscribe "${name}"`)
  }
}

/**
 * Post an event and call each handlers to process it 
 * @param {string} evt 
 * @param {object} arg 
 */
export function postEvent(evt, arg) {
  for (let l of listeners) {
    l.handler(evt, arg);
  }
}