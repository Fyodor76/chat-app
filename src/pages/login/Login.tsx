import { Card } from '@/shared/ui/card'
import { CustomForm } from '@/shared/ui/custom-form/CustomForm'

import { configLogin } from './const/config-login'
import './Login.scss'
import { useForm } from 'antd/es/form/Form'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/shared/lib/hooks/useAuth'

const Login = () => {
  const [form] = useForm()

  const navigate = useNavigate()

  const {actions} = useAuth()

 const handleSubmit = async (values: any) => {
  console.log(values, values)
    try {
      await actions.login(values)
      setTimeout(() => {
      navigate('/')
      }, 1000) 
    } catch (error) {
      message.error('Auth failed')
    }
  }
  return (
    <div className="login-container">
      <h2 className="source-sans-3-regular title">{configLogin.title}</h2>
      <Card>
        <CustomForm configForm={configLogin as any} form={form} onFinish={handleSubmit}/>
      </Card>
    </div>
  )
}

export default Login
