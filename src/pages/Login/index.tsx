/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:48:05
 * @LastEditors: SongYijie
 */ 
import { connect } from 'react-redux';
import { IState } from '@/types';

import Login from './login';
import { signIn } from '@/actions/system';

const mapStateToProps = (state: IState) => ({
  isLoading: state.system.isLoading
});

export default connect(mapStateToProps, {
  signIn
})(Login);
