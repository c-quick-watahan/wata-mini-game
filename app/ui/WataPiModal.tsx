interface WataPiModalProps {
  flipModal: () => void;
}

export default function WataPiModal({ flipModal }: WataPiModalProps) {
  return (
    <div
      id="my_modal_1"
      className="fixed inset-0 flex justify-center items-center bg-cover bg-center backdrop-blur-md z-50"
    >
      <img src="/wata-pi-modal.svg" alt="Wata Pi Modal" />
      <button
        className="absolute top-0 right-0 m-4 text-2xl"
        onClick={flipModal}
      >
        Close
      </button>
    </div>
  );
}
