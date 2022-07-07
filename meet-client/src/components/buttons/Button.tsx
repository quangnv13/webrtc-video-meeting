import React from 'react';
type ButtonProps = {
  text: string;
  class?: string;
};
function Button(props: ButtonProps) {
  return <button className={props.class ? props.class : 'bg-blue-500 px-3 py-2 rounded-lg text-white text-[18px]'}>{props.text}</button>;
}
export default Button;
