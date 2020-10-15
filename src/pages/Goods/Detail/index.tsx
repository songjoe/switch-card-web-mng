import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { getGoodsCommentsPageList, getGoodsLogistics, checkComment } from '@/actions/goods';
import { IState } from '@/types';
import BaseInfo from './BaseInfo';
import Comments from './Comments';
import Logistics from './Logistics';

const { TabPane } = Tabs;

const Detail = (props:any) => {
  const historyParams:any = useParams();
  const [ baseInfo ] = useState(JSON.parse(decodeURIComponent(historyParams.goodsInfo)));
  const { getGoodsCommentsPageList, getGoodsLogistics, isLoading, checkComment } = props;

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="基本信息" key="1">
        <BaseInfo baseInfo={baseInfo} />
      </TabPane>
      <TabPane tab="评论" key="2">
        <Comments baseId={baseInfo.id} onGetComment={getGoodsCommentsPageList} commentCount={baseInfo.commentCount} isLoading={isLoading} onCheckComment={checkComment} />
      </TabPane>
      {
        baseInfo.state >= 32 && (
          <TabPane tab="物流信息" key="3">
            <Logistics baseId={baseInfo.id} mailNo={baseInfo.id} mailName={baseInfo.mailName} onGetLogistics={getGoodsLogistics} isLoading={isLoading} />
          </TabPane>
        )
      }
    </Tabs>
  )
}

const mapStateToProps = (state: IState) => ({
  isLoading: state.system.isLoading
});

export default connect(mapStateToProps, {
  getGoodsCommentsPageList,
  getGoodsLogistics,
  checkComment
})(Detail);