import { useState } from "react";

export default function useForm(initValues) {
  const [values, setVals] = useState(initValues);
  return {
    values,
    setValues({ target: { name, value } }) {
      setVals({ ...values, [name]: value });
    },
  };
}
