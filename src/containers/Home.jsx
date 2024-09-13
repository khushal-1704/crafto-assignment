import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, ExclamationCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";

import { useFethcQuotesQuery } from "../services/modules/quotes";
import { addQuote, resetQuotes } from "../store/quotes";
import { resetUser } from "../store/users";

import Loader from "../components/Loader";
import QuoteItem from "../components/QuoteItem";

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);
  const [allList, setAllList] = useState([]);
  const navigate = useNavigate();
  const {
    data: quotesList,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useFethcQuotesQuery({
    limit: 20,
    offset: currentPage * 20,
  });

  useEffect(() => {
    if (isError && error.status === 401) {
      dispatch(resetQuotes());
      dispatch(resetUser());
      navigate("/login");
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && quotesList?.data.length) {
      dispatch(addQuote(quotesList?.data));
      setAllList((state) => [...state, quotesList.data]);
    } else if (isSuccess && quotesList.data.length === 0) {
      setIsListEnd(true)
    }
  }, [quotesList]);

  const handleBackClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (currentPage === 0) {
      return 
    }
  };
  const handleNextClick = () => {
      setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError) {
    return (
      <div className="mt-16 flex items-center justify-center p-20 space-x-3">
        <ExclamationCircleIcon className="size-10 text-gray-200" />
        <span>Having Some issue. Please Try again later</span>
      </div>
    );
  }

  return (
    <section className="p-2 relative mt-16">
      <PlusCircleIcon
        className="cursor-pointer fixed right-3 bottom-14 md:bottom-5 flex size-14 items-center justify-center rounded-full text-blue-300"
        onClick={() => navigate("/new")}
      />
      {allList.length ? (
        <div className="space-y-5 flex flex-col items-center mt-2">
          {quotesList?.data.map((quote) => {
            return <QuoteItem quoteData={quote} key={quote.id} />;
          })}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <span>No item to show</span>
        </div>
      )}
      <div className="flex items-center justify-center w-full mt-6">
        <div className="flex items-center">
          <button
            className={`w-full flex items-center justify-center py-3 px-4 mr-2 rounded-lg text-white focus:outline-none ${
              currentPage === 0
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={currentPage === 0}
            onClick={handleBackClick}
          >
            <ChevronLeftIcon className="size-7" />
            <span className="px-2 text-sm">Back</span>
          </button>
          <button
            className={`w-full flex items-center justify-center py-3 px-4 text-sm tracking-wide rounded-lg text-white focus:outline-none ${
              isListEnd ? "bg-blue-300 " : "bg-blue-600 hover:bg-blue-700 "
            }`}
            onClick={handleNextClick}
            disabled={isListEnd}
          >
            <span className="px-2 text-sm">Next</span>
            <ChevronRightIcon className="size-7" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
