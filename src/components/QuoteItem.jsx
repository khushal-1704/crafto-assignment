/* eslint-disable react/prop-types */
const QuoteItem = ({ quoteData }) => {
  const { mediaUrl, username, text } = quoteData;
  return (
    <div className="flex flex-col w-80 h-[350px] md:w-96 md:h-full p-5 shadow-lg items-center rounded-lg">
      <div className="h-60 md:h-80 w-full">
        <img
          className="object-cover h-full w-full rounded-lg"
          src={
            mediaUrl
              ? mediaUrl
              : "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg"
          }
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between w-full mt-2 items-start text-left leading-normal">
        <h5 className="mb-2 text-lg text-title-truncate md:text-2xl font-bold text-left tracking-tight ">
          {username}
        </h5>
        <p className="mb-3 font-normal text-truncate text-gray-400">{text}</p>
      </div>
    </div>
  );
};

export default QuoteItem;
