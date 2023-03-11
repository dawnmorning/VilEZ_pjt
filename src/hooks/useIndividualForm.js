import { useEffect, useState } from "react";

function useIndividualForm({ initialValue, onSubmit, Validation }) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue({ [name]: value });
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 100));
    setError(Validation(value));
  };

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 100));
    setError(Validation(value));
  };

  useEffect(() => {
    if (isLoading) {
      if (Object.keys(error).length === 0) {
        onSubmit(value);
      }
      setIsLoading(false);
    }
  }, [error]);

  return {
    value,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    handleClick,
  };
}

export default useIndividualForm;
