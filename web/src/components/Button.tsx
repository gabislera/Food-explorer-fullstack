interface ButtonProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return (
    <button
      className="rounded-md w-full font-poppins font-normal text-light-100 bg-tomato-100 hover:bg-tomato-200 py-3 px-8"
      type="submit"
    >
      {title}
    </button>
  );
}
