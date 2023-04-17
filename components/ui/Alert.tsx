type AlertProps = {
  children: React.ReactNode;
};
const Alert = ({ children }: AlertProps) => {
  return <div className="rounded bg-red-200 p-2">{children}</div>;
};

export default Alert;
