const MiddleWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="relative min-h-screen flex items-center">{children}</div>;
};

export default MiddleWrapper;
