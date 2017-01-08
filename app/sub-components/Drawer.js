/**
 * Created by jahansj on 31/12/2016.
 */
import React from 'react';
import store from '../store';

const isActive = () => store.getState().app.app.header.drawer;

export default (props) => {
  let items;
  let activeClass;

  if (Array.isArray(props.items)) {
    items = props.items.map((item, i) => <li className={`drawer-list-item ${props.listItemClass}`} key={i}>{ item }</li>);
  }
  
  if (isActive()) {
    activeClass = props.activeClass;
  }

  return (
    <div className={ `drawer-wrapper ${ props.wrapperClass || '' } ${ activeClass }` }>
      {
        props.headerElement
      }
      <div className={ `drawer-container ${ props.containerClass }` }>
        <ul className={ `drawer-list ${ props.listClass }` }>
          {
            items
          }
        </ul>
      </div>
    </div>
  )
}