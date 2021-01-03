/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/


/*
	store keeps app's persistant data
*/


/**
 * Get an item (by the given "key") from storage (default is "localStorage")
 * @param {string} key 
 * @param {string} storage - available storage types include: localStorage, sessionStorage
 * @returns {object} a JSON parsed object, or undefined if not found
 */ 
function getStorageItem(key, storage = 'localStorage') {
  if (storage in window) {
    const dataString = window[storage].getItem(key)
    if (dataString) {
      console.log(`storage->${key}: ${dataString.substr(0, 64)}...`)
      return JSON.parse(dataString)
    }
  }
}

/**
 * Save a given "key" object to storage
 * @param {string} key 
 * @param {object} value 
 * @param {string} storage 
 */
function setStorageItem(key, value, storage = 'localStorage') {
  if(value === undefined || value === null) {
    return;
  }
  if (storage in window) {
    const dataString = JSON.stringify(value);
    console.log(`storage<- ${key}: ${dataString.substr(0, 64)}...`)
    window[storage].setItem(key, dataString)
  }
}

/**
 * Delete a given "key" item from storage
 * @param {string} key 
 * @param {string} storage 
 */
function removeStorageItem(key, storage = 'localStorage') {
  if (storage in window) {
    window[storage].removeItem(key);
  }
}


const store = {
	options: { }, // place holder for saving firework options
	settingsOpended: false, // whether settings drawer visible (opened) or not
};

let initialized = false;
export async function init() {
	if (initialized) {
		return;
	}
	initialized = true;
}


let lastUpdatedPref = ''
export function serialize() {
	const pref = {
		settingsOpended: store.settingsOpended,
		options: store.options,
	};
	const prefString = JSON.stringify(pref);
	if (prefString !== lastUpdatedPref) {
		setStorageItem('pref', pref)
	}
}


export function deserialize() {
	const pref = getStorageItem('pref');
	store.settingsOpended = false;
	store.options = pref?.options || {}
}

export default store;