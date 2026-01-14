import { ReactNode } from 'react'
import { Button, Checkbox, Form, Input, FormInstance } from 'antd'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import '../custom-form/CustomForm.scss'
import { ButtonType } from 'antd/es/button'

interface CustomFormProps {
  configForm: ConfigFormType
  form?: FormInstance
  onFinish?: (values: any) => void
  onFinishFailed?: (errorInfo: any) => void
  actions?: {
    [fieldName: string]: {
      onChange?: (value: any) => void
      onBlur?: (value: any) => void
      onFocus?: (value: any) => void
      onClick?: () => void
    }
  }
}

export interface ConfigFormType {
  title: string
  innerTitle: string
  subtitle: string
  className?: string
  sections: SectionType[]
}

interface SectionType {
  fields: FieldType[]
  className?: string
}

interface BaseField {
  typeField: 'input' | 'button' | 'checkbox' | 'link'
  name?: string
  size?: 'small' | 'middle' | 'large'
  children?: ReactNode | string
  className?: string
  rules?: any[]
  dependencies?: string[]
}

interface InputField extends BaseField {
  typeField: 'input'
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
}

interface ButtonField extends BaseField {
  typeField: 'button'
  type?: ButtonType
  block?: boolean
}

interface CheckboxField extends BaseField {
  typeField: 'checkbox'
}

interface LinkField extends BaseField {
  typeField: 'link'
  link?: string
}

type FieldType = InputField | ButtonField | CheckboxField | LinkField

// Type guards для проверки типов полей
const isInputField = (field: FieldType): field is InputField => field.typeField === 'input'
const isButtonField = (field: FieldType): field is ButtonField => field.typeField === 'button'
const isCheckboxField = (field: FieldType): field is CheckboxField => field.typeField === 'checkbox'
const isLinkField = (field: FieldType): field is LinkField => field.typeField === 'link'

export const CustomForm = ({ 
  configForm, 
  form: externalForm, 
  onFinish, 
  onFinishFailed, 
  actions = {} 
}: CustomFormProps) => {
  const [form] = Form.useForm(externalForm)

  const handleFieldChange = (fieldName: string, value: any) => {
    if (actions[fieldName]?.onChange) {
      actions[fieldName].onChange!(value)
    }
  }

  const handleFieldBlur = (fieldName: string, value: any) => {
    if (actions[fieldName]?.onBlur) {
      actions[fieldName].onBlur!(value)
    }
  }

  const handleFieldFocus = (fieldName: string, value: any) => {
    if (actions[fieldName]?.onFocus) {
      actions[fieldName].onFocus!(value)
    }
  }

  const handleButtonClick = (fieldName: string) => {
    if (actions[fieldName]?.onClick) {
      actions[fieldName].onClick!()
    }
  }

  return (
    <Form
      form={form}
      className={configForm.className}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      {configForm.innerTitle && <p className="card-title">{configForm.innerTitle}</p>}

      {configForm.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={classNames('form-section', section.className)}>
          {section.fields.map((field, fieldIndex) => {
            const fieldName = field.name || `field_${sectionIndex}_${fieldIndex}`

            return (
              <div key={fieldIndex} className={field.className}>
                {isInputField(field) && (
                  <Form.Item
                    name={field.name}
                    rules={field.rules}
                    dependencies={field.dependencies}
                  >
                    <Input 
                      size={field.size} 
                      placeholder={field.placeholder}
                      type={field.type}
                      onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                      onBlur={(e) => handleFieldBlur(fieldName, e.target.value)}
                      onFocus={(e) => handleFieldFocus(fieldName, e.target.value)}
                    />
                  </Form.Item>
                )}

                {isCheckboxField(field) && (
                  <Form.Item
                    name={field.name}
                    valuePropName="checked"
                    rules={field.rules}
                  >
                    <Checkbox
                      onChange={(e) => handleFieldChange(fieldName, e.target.checked)}
                    >
                      {field.children}
                    </Checkbox>
                  </Form.Item>
                )}

                {isButtonField(field) && (
                  <Form.Item>
                    <Button 
                      size={field.size} 
                      type={field.type}
                      block={field.block}
                      onClick={() => handleButtonClick(fieldName)}
                      htmlType="submit"
                    >
                      {field.children}
                    </Button>
                  </Form.Item>
                )}

                {isLinkField(field) && (
                  <div>
                    <Link to={field.link || '#'}>{field.children}</Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </Form>
  )
}