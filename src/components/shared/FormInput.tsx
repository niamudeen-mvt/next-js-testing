import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

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
    <>
      <div className="border-b border-gray-400  flex items-center gap-x-4">
        {name === "email" ? (
          <MdEmail />
        ) : name === "name" ? (
          <FaUserAlt />
        ) : name === "phone" ? (
          <FaPhoneFlip />
        ) : name === "password" ? (
          <RiLockPasswordFill />
        ) : (
          ""
        )}
        <input
          type="text"
          {...register(name, {
            required: {
              value: true,
              message: "This field is required",
            },
            ...(name === "name"
              ? {
                  validate: (value: number) => isNaN(value),
                }
              : {}),
            ...(name === "password"
              ? {
                  minLength: {
                    value: 3,
                    message: "Password should be at-least 3 characters.",
                  },
                }
              : {}),
            ...(name === "email"
              ? {
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is invalid",
                  },
                }
              : {}),
            ...(name === "phone"
              ? {
                  maxLength: {
                    value: 10,
                    message: "Phone must contian 10 digits",
                  },
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Phone number is invalid",
                  },
                }
              : {}),
          })}
          placeholder={name}
          className="bg-transparent text-sm black py-2 pl-3 outline-none placeholder:capitalize"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      {errorsObj[name] && (
        <p className="text-xs pl-1 text-red-600">{errorsObj[name].message}</p>
      )}
    </>
  );
};

export default FormInput;
