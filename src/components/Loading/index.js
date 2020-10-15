/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:48:05
 * @LastEditors: SongYijie
 */ 
import { connect } from 'react-redux';

import Loading from './container';

const mapStateToProps = state => ({
  isLoading: state.system.isLoading
});

export default connect(mapStateToProps)(Loading);
