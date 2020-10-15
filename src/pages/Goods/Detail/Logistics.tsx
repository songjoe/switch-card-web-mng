import React, { useEffect, useState } from 'react';
import { Timeline, Skeleton } from 'antd';

import { IGoodsLogisticsProps } from '@/types';
import styles from './../styles.less';

const { Item: TimelineItem } = Timeline;

const Logistics = (props: IGoodsLogisticsProps) => {
  const { onGetLogistics, baseId, mailNo, mailName, isLoading } = props;
  const [ logistics, setLogistics ]: [any, any] = useState({});

  useEffect(() => {
    onGetLogistics({
      goodsId: baseId,
      mailNo,
      mailName
    }).then((res: any) => {
      if (res.code === 200) {
        setLogistics(res.response);
      }
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Skeleton loading={isLoading} active>
      <p className={styles.logisticsName}>{logistics.expTextName} {logistics.mailNo}</p>
      <p className={styles.logisticsTime}>最后更新于: {logistics.updateStr}</p>
      <Timeline mode='left'>
        {
          Array.isArray(logistics.data) && logistics.data.map((item: any, index: number) => (
            <TimelineItem key={index} color={index === 0 ? 'blue' : 'gray'}>
              <p>{item.time}</p>
              <p>{item.context}</p>
            </TimelineItem>
          ))
        }
      </Timeline>
    </Skeleton>
  );
}

export default Logistics;