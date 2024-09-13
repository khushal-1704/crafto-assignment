/* eslint-disable react/prop-types */
const DropDown = ({ dropDowndata, listStyle }) => {
  return (
    <div className="z-10 fixed top-[57px] right-[15px]  divide-y divide-gray-100 rounded-lg shadow w-44 bg-blue-500">
      <ul className="py-2 text-sm ">
        {dropDowndata.map((drop) => (
          <li
            key={drop.title}
            className={`block px-4 py-2 cursor-pointer text-white font-semibold  ${listStyle}`}
            onClick={drop.onClick}
          >
            {drop.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
