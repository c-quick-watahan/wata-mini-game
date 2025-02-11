interface StartButtonModalProps {
  flipStartButtonModal: () => void;
}
export default function StartButtonModal(props: StartButtonModalProps) {
  const { flipStartButtonModal } = props;

  return (
    <>
      <div
        id="my_modal_1"
        className="fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center backdrop-blur-md z-40"
      >
        <button
          onClick={() => {
            flipStartButtonModal();
          }}
          className="btn btn-outline btn-lg btn-success"
        >
          Start
        </button>
      </div>
    </>
  );
}
