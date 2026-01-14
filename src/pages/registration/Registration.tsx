import { CustomForm } from '@/shared/ui/custom-form/CustomForm'
import { Card, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { configRegistrations } from './const/config-registrations'
import './Registration.scss'

const Registration = () => {
  const [form] = useForm()

  const handleSubmit = (values: any) => {
    console.log('Registration data:', values)
    // Здесь логика регистрации
    message.success('Registration successful!')
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