/**
 * Created by jahansj on 23/10/2016.
 */
import React from 'react';

export default (props) => {
  let rows = [];

  for (let i = 0, length = props.displayText.length; i < length; i++) {
    rows.push(<span className={props.sharedClass} key={i}>{ props.displayText[i] }</span>);
  }

  return (
      <div className={props.containerClass}>
        {
            rows
        }
      </div>
  )
};