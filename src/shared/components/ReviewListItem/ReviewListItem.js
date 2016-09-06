import React from 'react'
import { Paper } from 'material-ui';

import FiveStar from '../../components/FiveStar'
import styles from './index.css'

// TODO: 文言propsで置き換え

export default (props) => {
  return(
    <Paper className={`${styles.rvwSection}`}>
      <div className={styles.rvwData}>
        <h3 className={styles.rvwTitle}>使い勝手がいいと思う。</h3>

        <FiveStar rating={props.rating} />

        <p className={styles.reviewerName}>
          by Eating woman
          <span className="rvwr-name__count">(65)</span>
          <mark className="mark-auth-mobile">[携帯電話番号認証済]</mark>
        </p>
        <p className={styles.rvwDate}>
          <span className="rvw-date__number">'16/07/02</span>
          <span className="rvw-date__number">('16/07</span> 訪問)
        </p>
      </div>
      <p className={styles.rvwPhoto}>
        <img alt="" width="70" height="70" src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/53047/100x100_square_53047488.jpg" />
      </p>
    </Paper>
  )
}
