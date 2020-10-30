/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:48:05
 * @LastEditors: SongYijie
 */ 
import { connect } from 'react-redux';

import { IState } from '@/types';
import { getUserPageList } from '@/actions/user';
import { updateFilter } from '@/actions/filter';

import User from './user';

const mapStateToProps = (state: IState) => ({
  isLoading: state.system.isLoading,
  filter: state.filter.users,
  dataSource: state.entities.users,
  meta: state.meta.users
});

export default connect(mapStateToProps, {
  getUserPageList,
  updateFilter
})(User);
