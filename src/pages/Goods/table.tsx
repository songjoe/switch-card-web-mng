import React, { useState } from 'react';
import { Table, Button, Divider } from 'antd';
import moment from 'moment';
import { useHistory } from "react-router-dom";

import { GoodsState, getLabel } from '@/constants/pageStatus';
import { IGoodsTable, IGoods } from '@/types';
import CloseOrder from './CloseOrder';
import styles from './styles.less';

const DataTable = (props: IGoodsTable) => {

  const { dataSource, meta, onPaginationChange, onShowSizeChange, onCloseOrder, isLoading } = props;
  const history = useHistory();
  const [ closeOrderInfo, setCloseOrderInfo ] = useState({
    visible: false,
    baseId: '',
    baseName: ''
  })

  const handelDetail = (goods: IGoods) => {
    const params = encodeURIComponent(JSON.stringify(goods));
    history.push(`/goods/detail/${params}`);
  }

  const handelCloseOrder = (id: string, name: string) => {
    setCloseOrderInfo({
      visible: true,
      baseId: id,
      baseName: name
    })
  }

  const handelCancel = () => {
    setCloseOrderInfo({
      visible: false,
      baseId: '',
      baseName: ''
    })
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '喜爱数',
      dataIndex: 'linkCount'
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: string) => getLabel(GoodsState, text)
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '定价',
      dataIndex: 'price',
      render: (_: string, record: IGoods) => (
        <>
          <span className={styles.discountPrice}>¥{record.discountPrice || 0}</span>
          <span> / </span>
          <span className={styles.originalPrice}>¥{record.originalPrice || 0}</span>
        </>
      )
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (_:string, info: IGoods) => [
        <Button type="link" onClick={() => handelDetail(info)} key={1} loading={isLoading}>详情</Button>,
        (info.state === 21 || info.state === 20) && [
          <Divider type="vertical" key={1} />,
          <Button danger type="link" onClick={() => handelCloseOrder(info.id, info.name)} key={2} loading={isLoading}>关闭订单</Button>
        ]
      ]
    }
  ];

  const data = Object.keys(dataSource)
      .slice(0, meta.pageSize)
      .map(id => ({
        key: id,
        ...(dataSource[id])
      }));

  return (
    <>
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
      <CloseOrder
        visible={closeOrderInfo.visible}
        baseId={closeOrderInfo.baseId}
        onCancel={handelCancel}
        baseName={closeOrderInfo.baseName}
        onCloseOrder={onCloseOrder}
        isLoading={isLoading}
      />
    </>
  )
}

export default DataTable;