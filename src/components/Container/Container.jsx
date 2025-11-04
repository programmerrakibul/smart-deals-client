const Container = ({ children, className = "" }) => {
  return (
    <div className={`${className} container mx-auto px-5`}>{children}</div>
  );
};

export default Container;
