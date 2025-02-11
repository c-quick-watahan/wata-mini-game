import Link from "next/link";
import Image from "next/image";

interface QrModalProps {
  flipQR: () => void;
  filename: string;
}

export default function QrModal({ flipQR, filename }: QrModalProps) {
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${filename}%2F${filename}_coupon_qr.png?alt=media`;
  return (
    <>
      <div
        id="qr_modal"
        className="gap-2 fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center backdrop-blur-md z-50"
      >
        <Image
          // src={`/${filename}/${filename}_coupon_qr.png`} // Set the image source
          src={imageUrl}
          alt={`${filename}_coupon_qr`}
          // layout="responsive" // Make the image responsive
          width={500} // Set the intrinsic width of the image (for aspect ratio)
          height={500} // Set the intrinsic height of the image (for aspect ratio)
          className="max-w-full max-h-full block mx-auto relative"
        />
        <Link href="/">
          <button
            id="play_another"
            className="px-4 py-2 bg-blue-500 text-white rounded text-4xl"
            onClick={flipQR}
          >
            Play Another
          </button>
        </Link>
      </div>
    </>
  );
}
