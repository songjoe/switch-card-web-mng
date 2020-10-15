/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:27:18
 * @LastEditors: SongYijie
 */ 
const AuthorityWrap = (props: any) => {
  const { children, level } = props;
  return (
    level === 2 ? children : null
  )
}

export default AuthorityWrap;