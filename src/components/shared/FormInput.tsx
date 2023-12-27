import { ReactNode } from "react";
import { MdEmail } from "react-icons/md";

const FormInput = ({
  name,
  register,
  errors,
}: {
  name: string;
  register: any;
  errors: any;
}) => {
  const errorsObj: any = errors;
  return (
    <div className="border-b border-gray-400  flex items-center">
      <MdEmail />
      <input
        type="text"
        {...register(name, {
          required: {
            value: true,
            message: "This field is required",
          },
          ...(name === "password"
            ? {
                minLength: {
                  value: 3,
                  message: "Password should be at-least 3 characters.",
                },
              }
            : {}),
        })}
        placeholder={name}
        className="bg-transparent text-xs black py-2 pl-3 outline-none capitalize"
        autoComplete="off"
        spellCheck={false}
      />
      {errorsObj[name] && (
        <p className="text-xs mb-3 pl-1">{errorsObj[name].message}</p>
      )}
    </div>
  );
};

export default FormInput;
