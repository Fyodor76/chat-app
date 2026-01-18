import { CustomForm } from '@/shared/ui/custom-form/CustomForm'
import { message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { configRegistrations } from './const/config-registrations'
import './Registration.scss'
import { useUser } from '@/shared/lib/api/user/useMutation'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/card'

const Registration = () => {
  const [form] = useForm()
  const navigate = useNavigate()

  const {create} = useUser()

 const handleSubmit = async (values: any) => {
    try {
      await create(values)
      message.success('Registration successful!')
      navigate('/login') 
    } catch (error) {
      message.error('Registration failed')
    }
  }

  return (
    <div className="registration">
      <h2 className="source-sans-3-regular title">{configRegistrations.title}</h2>
      <Card>
        <CustomForm 
          configForm={configRegistrations}
          form={form}
          onFinish={handleSubmit}
        />
      </Card>
    </div>
  )
}

export default Registration