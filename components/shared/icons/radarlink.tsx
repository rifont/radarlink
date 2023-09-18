export default function RadarLink({ className, height, width }: { className?: string, height: number, width: number }) {
  return (
    <svg
      viewBox="0 0 98 84"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={height}
      width={width}
    >
      <path fill="#333333" className="dark:fill-foreground"
        d="M 14.677 55.422 L 31.524 83.996 L 48.631 83.996 L 23.237 40.92 L 14.677 55.422 Z M 26.581 35.242 L 55.325 83.997 L 72.432 83.997 L 35.135 20.738 L 26.581 35.242 Z M 38.485 15.052 L 79.132 83.996 L 95.114 83.996 C 97.345 83.996 98.732 81.554 97.592 79.622 L 51.48 1.418 C 50.361 -0.472 47.636 -0.472 46.523 1.418 L 38.485 15.051 L 38.485 15.052 Z" />
      <path fill="#448ae9"
        d="M 13.79 65.282 C 12.611 63.397 10.066 63.337 8.855 65.3 L 0.408 79.62 C -0.732 81.551 0.654 83.994 2.885 83.994 L 19.73 84 C 21.919 84 23.312 81.6 22.218 79.6 L 13.79 65.282 Z" />
    </svg>
  );
}
