import { useEffect, useState } from "react";
import ReactImagePickerEditor from "react-image-picker-editor";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Config, SAMPLE_IMAGE } from "../config";

import { useCreateQuoteMutation } from "../services/modules/quotes";
import { resetQuotes } from "../store/quotes";
import { resetUser } from "../store/users";

//Hooks
import useScreenSizeWatcher from "../hooks/useScreenSizeWatcher";

import Loader from "../components/Loader";

const NewQuote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [textInput, setTextInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useScreenSizeWatcher(setIsMobile, "760px");

  const [createQuotePost, { data, error, isError, isSuccess, reset }] =
    useCreateQuoteMutation();

  useEffect(() => {
    if (data) {
      toast.success("Post Create Successfully");
      //RESET CONTENT
      setIsLoading(false);
      setImgUrl("");
      setTextInput("");
      reset();
      navigate("/");
    }
    if (isError && error.status === 401) {
      toast.error("Unable to create new post");
      dispatch(resetQuotes());
      dispatch(resetUser());
      navigate("/login");
    }
  }, [isSuccess, error, data]);

  const handleUpload = async () => {
    if (textInput.length < 4) {
      toast.error("Please enter the quote also.");
      return;
    }
    if (!imgUrl.length) {
      toast.error("Please Upload image");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imgUrl);
    try {
      const response = await axios.post(Config.MEDIA_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        createQuotePost({
          text: textInput,
          mediaUrl: SAMPLE_IMAGE,
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex relative items-center mt-16 justify-center h-screen">
      {isLoading ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#33333352] z-50">
          <Loader />
        </div>
      ) : null}
      <div className="w-[350px] h-[500px]  md:w-[600px] flex flex-col items-center justify-center rounded-xl md:h-[600px] bg-slate-200">
        <div className="h-[10%] flex items-center">
          <h2 className="font-semibold text-xl text-blue-600">
            Create New Post
          </h2>
        </div>
        <div className="h-[70%] w-full flex flex-col justify-center items-center space-y-4">
          <div className="p-5 bg-white rounded-xl cursor-pointer">
            <ReactImagePickerEditor
              config={{
                borderRadius: "8px",
                language: "en",
                width: isMobile ? "150px" : "350px",
                height: isMobile ? "150px" : "250px",
                objectFit: "contain",
                compressInitial: null,
                hideEditBtn: true,
                hideDownloadBtn: true,
                hideAddBtn: true,
                hideDeleteBtn: false,
                darkMode: false,
                rtl: false,
              }}
              imageSrcProp={imgUrl}
              imageChanged={(newDataUri) => {
                setImgUrl(newDataUri);
              }}
            />
          </div>

          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="text-base outline-none p-2 w-[80%] rounded-lg"
            placeholder="Please enter your quote here"
          />
        </div>
        <div className="h-[20%]">
          <button
            className="px-5 py-2 rounded-md bg-blue-500 font-semibold text-white"
            onClick={handleUpload}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewQuote;
