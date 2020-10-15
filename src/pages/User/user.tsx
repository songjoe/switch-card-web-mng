import React, { useEffect } from 'react';

import Filter from './Filter';
import DataTable from './Table';

const User = (props:any) => {

  const { filter, dataSource, meta, isLoading } = props;
  const handleGetPageList = (values:any = {}) => {
    const { getUserPageList, updateFilter } = props;
    updateFilter('users', values);
    getUserPageList(values);
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
        isLoading={isLoading}
      />
    </div>
  )
}

export default User;