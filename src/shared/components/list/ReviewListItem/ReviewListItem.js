import React from 'react'
import { Paper } from 'material-ui';
import Ink from 'react-ink';

import FiveStar from '../../FiveStar'
import IsAuthenticated from '../../review/IsAuthenticated'
import styles from './index.css'

export default (props) => {
  return(
    <Paper className={`${styles.rvwSection}`}>
      <Ink radius={50} duration={200} />
      <div className={styles.rvwData}>
        <h3 className={styles.rvwTitle}>{props.title}</h3>

        <FiveStar rating={props.rating} />

        <p className={styles.reviewerName}>
          by {props.author}
          {/* <span className="rvwr-name__count">(65)</span> */}
          <IsAuthenticated bool={props.isAuthenticated} />
        </p>
        <p className={styles.rvwDate}>
          <span className="rvw-date__number">'{props.postDate}</span>
          <span className="rvw-date__number">('{props.visitDate}</span> visited)
        </p>
      </div>
      <p className={styles.rvwPhoto}>
        <img role="presentation" width="70" height="70" src={props.imgSrc} />
      </p>
    </Paper>
  )
}
