import React from 'react';
import { Form, Input, Button } from 'antd';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import md5 from 'md5';

import Logo from '@/components/Logo';
import CopyRight from '@/components/CopyRight';
import styles from './styles.less';

const { Item: FormItem } = Form;
const { Password } = Input;

const Login = (props: any) => {
  const tailLayout = {
    wrapperCol: { span: 24 },
  };

  const onFinish = (values: Store) => {
    values.role = 'admin';
    values.password = md5(md5(`card-${values.password}`))
    props.signIn(values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
  };

  return (
    <div className={styles.login}>
      {/* <video className={styles['bg-video']} mtt-playsinline="" autoPlay loop playsInline webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" muted src="https://switch-cn.gtgres.com/home/video/home.mp4">
        您的浏览器不支持 HTML5 video 标签
      </video> */}
      <Logo showText style={{ position: 'absolute', top: '20px', left: '20px'}} />
      <div className={styles['form-wrap']}>
        <p className={styles.title}>登录中僖创智</p>
        <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...tailLayout}
            name="userName"
            rules={[{ required: true, message: '请输入用户名' }]}
            hasFeedback
          >
            <Input placeholder='请输入用户名' autoComplete='off' />
          </FormItem>

          <FormItem
            {...tailLayout}
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            hasFeedback
          >
            <Password placeholder='请输入密码' autoComplete='off' />
          </FormItem>

          <FormItem {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
      <CopyRight style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translate(-50%, 0)' }} />
    </div>
  )
}

export default Login;