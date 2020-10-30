import React, { useEffect } from 'react';

import Filter from './filter';
import DataTable from './table';

const Goods = (props:any) => {

  const { filter, dataSource, meta, closeOrder, isLoading } = props;
  const handleGetPageList = (values:any = {}) => {
    const { getGoodsPageList, updateFilter } = props;
    updateFilter('goods', values);
    getGoodsPageList(values);
  }

  useEffect(() => {
    handleGetPageList(filter);
    // eslint-disable-next-line
  }, [])

  const handlePaginationChange = (current: number) => {
    handleGetPageList({
      ...filter,
      current
    });
  }

  const handleShowSiezChange = (_:number, pageSize: number) => {
    handleGetPageList({
      ...filter,
      current: 1,
      pageSize
    });
  }

  return (
    <div>
      <Filter onSearch={handleGetPageList} filter={filter} isLoading={isLoading} />
      <DataTable
        dataSource={dataSource}
        meta={meta}
        onPaginationChange={handlePaginationChange}
        onShowSizeChange={handleShowSiezChange}
        onCloseOrder={closeOrder}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Goods;