import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const variantClassMap = {
  primary: 'button button--primary',
  secondary: 'button button--secondary',
  ghost: 'button button--ghost',
};

const sizeClassMap = {
  default: '',
  small: 'button--small',
};

const Button = forwardRef(function Button(
  { as: asProp, to, href, children, variant = 'primary', size = 'default', className = '', ...rest },
  ref,
) {
  const classNames = [variantClassMap[variant] ?? variantClassMap.primary, className]
    .filter(Boolean)
    .join(' ');

  const Component = asProp || (to ? Link : href ? 'a' : 'button');

  const componentProps = {
    ref,
    className: [classNames, sizeClassMap[size] ?? ''].filter(Boolean).join(' '),
    ...rest,
  };

  if (Component === Link && to) {
    componentProps.to = to;
  }

  if (Component === 'a' && href) {
    componentProps.href = href;
  }

  if (Component === 'button' && !componentProps.type) {
    componentProps.type = 'button';
  }

  return <Component {...componentProps}>{children}</Component>;
});

export default Button;
