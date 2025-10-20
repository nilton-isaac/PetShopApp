import React from 'react';

export default function Card({ as: Component = 'section', tonal = false, className = '', children, ...rest }) {
  const classNames = ['card', tonal ? 'card--tonal' : '', className].filter(Boolean).join(' ');
  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}
