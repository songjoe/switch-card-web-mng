import React from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';
import { useHistory } from "react-router-dom";

import { ITable, IUser } from '@/types';

const DataTable = (props: ITable) => {

  const { dataSource, meta, onPaginationChange, onShowSizeChange, isLoading } = props;
  const history = useHistory();

  const handelDetail = (user: IUser) => {
    const params = encodeURIComponent(JSON.stringify(user));
    history.push(`/user/detail/${params}`);
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'createDate',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (_:string, info: IUser) => (
        <Button type="link" onClick={() => handelDetail(info)} loading={isLoading}>详情</Button>
      )
    }
  ];

  const data = Object.keys(dataSource)
      .slice(0, meta.pageSize)
      .map(id => ({
        key: id,
        ...(dataSource[id])
      }));

  return (
    <Table
      className="app-page-table"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{
        ...meta,
        onChange: onPaginationChange,
        onShowSizeChange,
        showQuickJumper: true,
        disabled: isLoading
      }}
    />
  )
}

export default DataTable;