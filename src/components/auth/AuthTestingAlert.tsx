import { Alert, AlertDescription } from "@/components/ui/alert";

const AuthTestingAlert = () => {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <AlertDescription className="text-sm text-blue-800">
        For testing, you can create a new account with any email. The verification email step has been disabled.
      </AlertDescription>
    </Alert>
  );
};

export default AuthTestingAlert;