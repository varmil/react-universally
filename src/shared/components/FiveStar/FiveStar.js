import React from 'react'
import StarRating from 'react-rating';
import Star from 'material-ui/svg-icons/toggle/star';
import { grey300, yellow700 } from 'material-ui/styles/colors';
import styles from './index.css'

const starStyle = {
  width: 20,
  height: 20,
}

export default (props) => {
  return(
    <span>
      <StarRating
        empty={<Star style={starStyle} color={grey300} />}
        full={<Star style={starStyle} color={yellow700} />}
        readonly={true}
        initialRate={props.rating}
      />
      <span className={`${styles.adjustRatingLine} ${styles.ratingLabel}`}>{props.rating.toFixed(2)}</span>
    </span>
  )
}
