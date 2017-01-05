/**
 * Created by jahansj on 31/12/2016.
 */
import React from 'react';


export default (props) => {
  let items = props.items.map((item, i) => <li className={`drawer-list-item ${props.listItemClass}`} key={i}>{ item }</li>);
  
  return (
      <div className={ `drawer-wrapper ${ props.wrapperClass }` }>
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