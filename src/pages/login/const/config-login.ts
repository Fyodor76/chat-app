export const configLogin = {
  title: 'Chat App',
  innerTitle: 'Sign in to start your session',
  subtitle: '',
  className: '',
  sections: [
    {
      className: 'input-container',
      fields: [
        {
          name: 'login',
          typeField: 'input',
          size: 'large',
          placeholder: 'Email',
        },
        {
          name: 'password',
          typeField: 'input',
          size: 'large',
          placeholder: 'Password',
        },
      ],
    },
    {
      className: 'btns-container',
      fields: [
        {
          typeField: 'button',
          children: 'Sign In',
          type: 'primary',
          size: 'large',
        },
      ],
    },
    {
      className: 'links-container',
      fields: [
        {
          typeField: 'link',
          children: ' Register a new membership',
          link: '/registration',
        },
      ],
    },
  ],
}
