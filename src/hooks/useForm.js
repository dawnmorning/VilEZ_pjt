import { useEffect, useState } from "react";

function useForm({ initialValues, onSubmit, Validation }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 100));
    setErrors(Validation(values));
  };

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 100));
    setErrors(Validation(values));
  };

  useEffect(() => {
    if (isLoading) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setIsLoading(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleClick,
  };
}

export default useForm;
