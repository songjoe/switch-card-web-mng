/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:48:05
 * @LastEditors: SongYijie
 */ 
import { connect } from 'react-redux';

import { IState } from '@/types';
import { getGoodsPageList, closeOrder } from '@/actions/goods';
import { updateFilter } from '@/actions/filter';

import Goods from './goods';

const mapStateToProps = (state: IState) => ({
  isLoading: state.system.isLoading,
  filter: state.filter.goods,
  dataSource: state.entities.goods,
  meta: state.meta.goods
});

export default connect(mapStateToProps, {
  getGoodsPageList,
  updateFilter,
  closeOrder
})(Goods);
