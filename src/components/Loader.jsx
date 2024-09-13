/* eslint-disable react/prop-types */

const Loader  = ({
  type = 'page_loader',
  fullScreen = false,
}) => {
  const style = {
    page_loader: 'after:border-neutral-8 after:border-t-blue-500',
    upload_loader:
      'after:border-neutral-9 after:border-t-neutral-1 bg-neutral-9 rounded-full',
  }
  const showLoader = () => {
    return (
      <div className="absolute top-1/2 left-1/2 z-20 -translate-y-1/2  -translate-x-1/2">
        <div
          className={`after:contents-[''] flex h-full items-center justify-center after:h-[40px] after:w-[40px] after:animate-spin after:rounded-[50%] after:border-[3px] ${style[type]} `}
        ></div>
      </div>
    )
  }
  if (fullScreen) {
    return <div className="h-screen">{showLoader()}</div>
  }
  return showLoader()
}

export default Loader
