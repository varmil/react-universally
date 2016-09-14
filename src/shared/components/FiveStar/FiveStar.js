import React from 'react'
import StarRating from 'react-rating';
import Star from 'material-ui/svg-icons/toggle/star';
import { grey300, yellow700 } from 'material-ui/styles/colors';
import styles from './index.css'

const DEFAULT_SIZE = 20

function createLabel(props) {
  if (props.noLabel) return null

  // if rate can be changed, label does not show
  if (! props.rating) return null

  return (
    <span className={`${styles.adjustRatingLine} ${styles.ratingLabel}`}>{(props.rating) ? props.rating.toFixed(2) : ''}</span>
  )
}

export default (props) => {
  const rating = (props.rating !== undefined) ? Number(props.rating) : undefined
  const readonly = (props.readonly !== undefined) ? props.readonly : true
  const starStyle = {
    width: props.size || DEFAULT_SIZE,
    height: props.size || DEFAULT_SIZE,
  }

  return(
    <span>
      <StarRating
        empty={<Star style={starStyle} color={grey300} />}
        full={<Star style={starStyle} color={yellow700} />}
        readonly={readonly}
        initialRate={rating}
        fractions={props.fractions}
        onChange={props.onChange}
        onRate={props.onRate}
      />
      {createLabel(props)}
    </span>
  )
}
