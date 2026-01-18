import { ConfigFormType } from "@/shared/ui/custom-form/CustomForm";

export const configRegistrations = {
  title: 'Chat App',
  innerTitle: 'Register a new membership',
  subtitle: '',
  className: '',
  sections: [
    {
      className: 'input-container',
      fields: [
        {
          typeField: 'input',
          name: 'login',
          size: 'large',
          placeholder: 'Full name',
          rules: [
            { required: true, message: 'Please enter your full name!' },
            { min: 2, message: 'Name must be at least 2 characters!' }
          ]
        },
        {
          typeField: 'input',
          name: 'password',
          size: 'large',
          placeholder: 'Password',
          type: 'password',
          rules: [
            { required: true, message: 'Please enter your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]
        },
      ],
    },
    {
      className: 'btns-container',
      fields: [
        {
          typeField: 'button',
          name: 'register',
          children: 'Register',
          type: 'primary',
          size: 'large',
          block: true
        }
      ],
    },
    {
      fields: [
          {
          typeField: 'link',
          children: 'Back to auth',
          link: '/login',
        },
      ]
    }
  ],
} satisfies ConfigFormType