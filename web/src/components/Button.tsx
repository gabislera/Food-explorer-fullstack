interface ButtonProps {
  title: string;
  isSubmitting?: boolean
}

export function Button({ title, isSubmitting }: ButtonProps) {
  return (
    <button
      className={`rounded-md w-full font-poppins font-normal py-3 px-8 ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-tomato-100 hover:bg-tomato-200'}`}
      type="submit"
      disabled={isSubmitting}
    >
      {title}
    </button>
  );
}
