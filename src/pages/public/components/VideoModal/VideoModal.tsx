type Props = {
  videoUrl: string;
  onClose: () => void;
};

const VideoModal = ({ videoUrl, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative w-[90%] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl"
        >
          ✕
        </button>

        <iframe src={videoUrl} className="w-full h-full" allowFullScreen />
      </div>
    </div>
  );
};

export default VideoModal;
