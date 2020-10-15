import React from 'react';
import { Descriptions } from 'antd';

import { IGoodsBaseProps } from '@/types';
import { getTimeFormat } from '@/utils';
import { GoodsState, getLabel } from '@/constants/pageStatus';
import ViewImage from '@/components/ViewImage';
import styles from './../styles.less';

const { Item: DescriptionsItem } = Descriptions;

const BaseInfo = ({ baseInfo }: IGoodsBaseProps) => {

  return (
    <Descriptions>
      <DescriptionsItem label="ID">{baseInfo.id}</DescriptionsItem>
      <DescriptionsItem label="名称">{baseInfo.name}</DescriptionsItem>
      <DescriptionsItem label="用户姓名">{baseInfo.userName}</DescriptionsItem>
      <DescriptionsItem label="商品图" span={3}>
        {
          baseInfo.showImage.map((img: string, index: number, imgs: Array<string>) => (
            <p className="small-image-preview" key={index}><ViewImage img={img} alt="商品图" set={imgs} index={index} /></p>
          ))
        }
      </DescriptionsItem>
      <DescriptionsItem label="状态">{getLabel(GoodsState, baseInfo.state)}</DescriptionsItem>
      <DescriptionsItem label="描述">{baseInfo.description}</DescriptionsItem>
      <DescriptionsItem label="喜爱数">{baseInfo.linkCount}</DescriptionsItem>
      <DescriptionsItem label="创建时间">{getTimeFormat(baseInfo.createDate)}</DescriptionsItem>
      <DescriptionsItem label="更新时间">{getTimeFormat(baseInfo.createDate)}</DescriptionsItem>
      <DescriptionsItem label="定价">
        <>
          <span className={styles.discountPrice}>¥{baseInfo.discountPrice || 0}</span>
          <span> / </span>
          <span className={styles.originalPrice}>¥{baseInfo.originalPrice || 0}</span>
        </>
      </DescriptionsItem>
      {
        (baseInfo.state === 21 || baseInfo.state === 22 || baseInfo.state === 23) && <DescriptionsItem label="备注" span={3}>{baseInfo.remarks}</DescriptionsItem>
      }
      {
        baseInfo.state >= 30 && [
          <DescriptionsItem label="购买者" key="1">{baseInfo.buyerName}</DescriptionsItem>,
          <DescriptionsItem label="成交价" key="2" span={2}>
            <span className={styles.finalPrice}>¥{baseInfo.finalPrice || 0}</span>
          </DescriptionsItem>
        ]
      }
      {
        baseInfo.state >= 32 && [
          <DescriptionsItem label="快递单号" key="1">{baseInfo.mailNo}</DescriptionsItem>,
          <DescriptionsItem label="快递公司" key="2" span={2}>{baseInfo.mailName}</DescriptionsItem>
        ]
      }
    </Descriptions>
  );
}

export default BaseInfo;