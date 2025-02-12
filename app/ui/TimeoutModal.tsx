"use client";

interface TimeoutModalProps {
  closeTimeoutModal: () => void;
}
export default function TimeoutModal(props: TimeoutModalProps) {
  const { closeTimeoutModal } = props;

  return (
    <>
      <div
        id="my_modal_1"
        className="fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center backdrop-blur-md z-40"
      >
        <button
          onClick={() => {
            closeTimeoutModal();
          }}
          className="btn btn-lg btn-warning"
        >
          Restart
        </button>
      </div>
    </>
  );
}
