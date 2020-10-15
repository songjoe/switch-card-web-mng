import React from 'react';
import { Descriptions } from 'antd';

import { IUserBaseProps } from '@/types';
import { getTimeFormat } from '@/utils';
import { UserCardType, getLabel } from '@/constants/pageStatus';

const { Item: DescriptionsItem } = Descriptions;

const BaseInfo = ({ baseInfo }: IUserBaseProps) => {
  return (
    <Descriptions>
      <DescriptionsItem label="ID">{baseInfo.id}</DescriptionsItem>
      <DescriptionsItem label="姓名">{baseInfo.name}</DescriptionsItem>
      <DescriptionsItem label="手机号">{baseInfo.phone}</DescriptionsItem>
      <DescriptionsItem label="身份证号">{baseInfo.idNum}</DescriptionsItem>
      <DescriptionsItem label="证件类型">{getLabel(UserCardType, baseInfo.idCardType)}</DescriptionsItem>
      <DescriptionsItem label="创建时间">{getTimeFormat(baseInfo.createDate)}</DescriptionsItem>
      <DescriptionsItem label="关注数">{baseInfo.attentionCount}</DescriptionsItem>
      <DescriptionsItem label="粉丝数">{baseInfo.fanCount}</DescriptionsItem>
      <DescriptionsItem label="喜爱数">{baseInfo.likeCount}</DescriptionsItem>
      <DescriptionsItem label="租赁数">{baseInfo.leaseCount}</DescriptionsItem>
      <DescriptionsItem label="出租数">{baseInfo.rentCount}</DescriptionsItem>
    </Descriptions>
  );
}

export default BaseInfo;