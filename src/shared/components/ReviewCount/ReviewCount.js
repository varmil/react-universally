import React from 'react'
import CommTextsms from 'material-ui/svg-icons/communication/textsms';
import { grey300 } from 'material-ui/styles/colors';
import styles from './index.css'

export default (props) => {
  return(
    <span className={`${styles.adjustRatingLine} ${styles.reviewCount}`}>
      {<CommTextsms color={grey300} style={{ width: '20px', height: '20px' }} />}{props.count}
    </span>
  )
}
