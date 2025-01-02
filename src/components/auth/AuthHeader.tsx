interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;