import React from "react";

const FormError = ({ children }: any) => {
  return <span data-testid="form-error" className="pt-1 text-sm text-red-500">{children}</span>;
};

export default FormError;
