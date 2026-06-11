interface Props {
  onClick: () => void;
}

const ModalCloseButton = ({
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className="
        absolute
        top-6
        right-6
        h-10
        w-10
        rounded-full
        flex
        items-center
        justify-center
        bg-white
        border
        border-slate-200
        shadow-lg
        text-slate-600
        hover:bg-red-50
        hover:text-red-600
        transition-all
        duration-200
        z-50
      "
    >
      ✕
    </button>
  );
};

export default ModalCloseButton;