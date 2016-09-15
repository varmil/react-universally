import React from 'react'
import { Paper } from 'material-ui';

import FiveStar from '../../FiveStar'
import styles from './index.css'

function createIsAuthenticated(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <mark className="mark-auth-mobile">[携帯電話番号認証済]</mark>
    )
  } else {
    return (
      null
    )
  }
}

export default (props) => {
  return(
    <Paper className={`${styles.rvwSection}`}>
      <div className={styles.rvwData}>
        <h3 className={styles.rvwTitle}>{props.title}</h3>

        <FiveStar rating={props.rating} />

        <p className={styles.reviewerName}>
          by {props.author}
          {/* <span className="rvwr-name__count">(65)</span> */}
          {createIsAuthenticated(props.isAuthenticated)}
        </p>
        <p className={styles.rvwDate}>
          <span className="rvw-date__number">'{props.postDate}</span>
          <span className="rvw-date__number">('{props.visitDate}</span> 訪問)
        </p>
      </div>
      <p className={styles.rvwPhoto}>
        <img role="presentation" width="70" height="70" src={props.imgSrc} />
      </p>
    </Paper>
  )
}
