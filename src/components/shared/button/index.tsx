type Props = {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const RoundedButton = ({ text = "text", onClick }: Props) => {
  return (
    <button
      className={`text-xs px-4 py-2 rounded-3xl border border-gray-600 hover:bg-black hover:text-white common__transition`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
