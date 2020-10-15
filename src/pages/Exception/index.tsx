import React from 'react';
import { Result, Button } from 'antd';
import DocumentTitle from 'react-document-title';
import { useParams, useHistory } from 'react-router-dom';

import { errInfo, getLabel } from '@/constants/pageStatus';

const Exception = () => {
  const errStatus:any = useParams();
  const { errCode } = errStatus;
  const history = useHistory();

  const handleGotoIndex = () => {
    history.replace('/home');
  }

  return (
    <DocumentTitle title={`${errCode} - 中僖创智`}>
      <Result
        status={errCode}
        title={errCode}
        subTitle={getLabel(errInfo, errCode as 404 | 403 | 500)}
        extra={<Button type="primary" onClick={handleGotoIndex}>回到首页</Button>}
      />
    </DocumentTitle>
    
  )
}

export default Exception;