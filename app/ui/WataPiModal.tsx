import Link from "next/link";

interface WataPiModalProps {
  flipModal: () => void;
  showQR: () => void;
  filename: string;
}

export default function WataPiModal({
  flipModal,
  showQR,
  filename,
}: WataPiModalProps) {
  return (
    <>
      <div
        id="my_modal_1"
        className="fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center backdrop-blur-md z-40"
      >
        <video className="w-[50vw] h-[50vh] block mx-auto relative" controls>
          <source src={`/${filename}/${filename}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative mt-4 flex space-x-4 z-40">
          <Link href="/">
            <button
              id="play_another"
              className="px-4 py-2 bg-blue-500 text-white rounded text-4xl"
              onClick={flipModal}
            >
              Play Another
            </button>
          </Link>
          <button
            id="get_coupon"
            className="px-4 py-2 bg-green-400 text-white rounded text-4xl"
            onClick={showQR}
          >
            Get Coupon
          </button>
        </div>
        <button
          id="close"
          className="absolute top-0 right-0 m-4 text-9xl text-black"
          onClick={flipModal}
        >
          X
        </button>
      </div>
    </>
  );
}
