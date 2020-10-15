/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:29:27
 * @LastEditors: SongYijie
 */ 
export interface IMeta {
  current: number;
  pageSize: number;
  total: number;
}
export interface ITable {
  dataSource: array[object];
  meta: IMeta;
  onPaginationChange: (current: number) => void;
  onShowSizeChange: (current: number, pageSize: number) => void;
  isLoading: boolean;
}

interface IGoodsTable extends ITable {
  onCloseOrder: (id: string) => voide
}