interface Props {
  onClose: () => void;
}

const DeletePurchaseDialog = ({
  onClose,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Delete Purchase
        </h2>

        <p>
          Backend DELETE route
          not implemented yet.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePurchaseDialog;