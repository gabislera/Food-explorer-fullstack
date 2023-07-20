import { Plus, X } from "@phosphor-icons/react";

interface TagProps {
  isNew?: any;
  value?: any;
  onClick?: any;
  placeholder?: string;
  onChange?: any;
}

export function Tag({
  isNew,
  value,
  onClick,
  placeholder,
  onChange,
}: TagProps) {
  return (
    <div
      className={
        isNew
          ? "border-[1px] border-dashed border-light-300 text-light-500 rounded-lg flex items-center relative"
          : "bg-light-600 text-light-100 rounded-lg flex items-center relative"
      }
    >
      <input
        className="bg-transparent px-4 w-full"
        placeholder={placeholder}
        type="text"
        value={value}
        readOnly={!isNew}
        onChange={onChange}
      />

      <button className="absolute right-4" type="button" onClick={onClick}>
        {isNew ? <Plus color="green" /> : <X color="red" />}
      </button>
    </div>
  );
}
