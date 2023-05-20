export const GenrePills = ({ genres }: { genres: string[] }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-left gap-2">
      {genres.map((genre, index) => (
        <div key={index} className={"pill"}>
          {genre}
        </div>
      ))}
    </div>
  );
};
