export const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
export const Input = ({ ...props }) => <input {...props} />;
