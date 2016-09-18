import React from 'react'
import { IconButton } from 'material-ui'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

import styles from './RstInfoSummary.css'
import { Flex, Box } from 'reflexbox'

// TODO: ymt 予算ちゃんとpropsで

export default (props) => {
  return(
    <Flex className={`${styles.flex}`} align="center" justify="space-around">
      <Box p={2} sm={11} className={`${styles.leftBox}`}>
        <div className={`${styles.summaryLine}`}>
          {props.area}
        </div>
        <div className={`${styles.summaryLine}`}>
          {props.genre}
        </div>
        <div className={`${styles.summaryLine}`}>
          <span className={`${styles.text}`}>￥3,000～￥3,999</span>
        </div>
        {/* <div className=`holiday`>
          <div><span className=`icon`>定休日</span><span className=`text`>年中無休　台風が来ても休みません！！！！</span></div>
        </div> */}
      </Box>
      <Box p={2} sm={1}>
        <div>
          <ChevronRight />
        </div>
      </Box>
    </Flex>


  )
}
