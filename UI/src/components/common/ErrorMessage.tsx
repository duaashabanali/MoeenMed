interface ErrorMessageProps {
    errorText: any;
  }
  
const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorText="this field is required" }) => {
    return (
    <div className='text-red-600 text-xs pt-1 font-semibold poppins'>{errorText}</div>
  )
}

export default ErrorMessage