interface Props {
  purchase: any;
  onClose: () => void;
}

const EditPurchaseModal = ({
  purchase,
  onClose,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">
          Edit Purchase
        </h2>

        <p>
          Backend PATCH route
          not implemented yet.
        </p>

        <button
          onClick={onClose}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditPurchaseModal;