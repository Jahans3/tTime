/**
 * Created by jahansj on 20/12/2016.
 */
"use strict";

const hasProperty = (obj, prop) => {
  if (Object.hasOwnProperty(prop)) {
    return obj[prop];
  }

  return false;
};

const hasDeepProperty = (obj, ...props) => {
  try {
    let propChain = obj;

    props.forEach((prop, i) => {
      propChain = propChain[prop];

      if (i === props.length - 1) {
        return propChain;
      }
    });
  } catch (e) {
    console.log(`destructure: Error: ${e}`);
    
    return false;
  }
};

module.exports = {
  hasProperty,
  hasDeepProperty
};