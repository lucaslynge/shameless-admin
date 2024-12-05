export default function Input({ field, form, placeholder, ...props }) {
  const { name, value, onChange, onBlur } = field;
  return (
    <input
      {...props}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className="text-base text-primaryColor border border-primaryColor w-full rounded-md focus:outline-none px-5 py-3 placeholder:text-primaryColor"
    />
  );
}
