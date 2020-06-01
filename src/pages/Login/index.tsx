import React from 'react';
import { Form, Input, Button } from 'antd';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import Logo from '@/components/Logo';
import styles from './styles.module.less';

const FormItem = Form.Item;

const Login = () => {

  const tailLayout = {
    wrapperCol: { span: 24 },
  };

  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login}>
      {/* <video className={styles.['bg-video']} mtt-playsinline="" autoPlay loop playsInline webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" muted src="https://switch-cn.gtgres.com/home/video/home.mp4">
        您的浏览器不支持 HTML5 video 标签
      </video> */}
      <Logo showText />
      <div className={styles['form-wrap']}>
        <p className={styles.title}>登录中僖创智</p>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...tailLayout}
            name="userName"
            rules={[{ required: true, message: '请输入用户名' }]}
            hasFeedback
          >
            <Input placeholder='请输入用户名' autoComplete='off'  />
          </FormItem>

          <FormItem
            {...tailLayout}
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            hasFeedback
          >
            <Input.Password placeholder='请输入密码' autoComplete='off'  />
          </FormItem>

          <FormItem {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default Login;