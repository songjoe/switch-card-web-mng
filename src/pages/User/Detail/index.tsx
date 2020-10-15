import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import BaseInfo from './BaseInfo';

const { TabPane } = Tabs;

const Detail = () => {
  const historyParams:any = useParams();
  const [ baseInfo ] = useState(JSON.parse(decodeURIComponent(historyParams.userInfo)));

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="基本信息" key="1">
        <BaseInfo baseInfo={baseInfo} />
      </TabPane>
    </Tabs>
  )
}

export default Detail;