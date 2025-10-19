import SkeletonCard from "./SkeletonCard";

export default function SkeletonList({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
