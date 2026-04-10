export default function ProgressBar({ progress }) {
  return <div id="pbar" style={{ width: `${progress}%` }}></div>;
}
