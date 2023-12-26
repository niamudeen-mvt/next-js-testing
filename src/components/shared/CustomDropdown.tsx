import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  showMenu: boolean;
  dropdownListData: { title: string }[];
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CustomDrodown = ({
  setShowMenu,
  showMenu,
  dropdownListData,
  setActiveCategory,
}: Props) => {
  return (
    <div className="group relative cursor-pointer">
      <span
        onClick={(event) => {
          event.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        <BsThreeDotsVertical className="font-medium text-black" />
      </span>

      {showMenu ? (
        <div className="bg-white min-w-[150px] min-h-[100px] rounded-lg text-sm absolute top-8 -translate-x-[80%] p-3 transition-all duration-500 active:block shadow-2xl z-10">
          <ul className="h-full flex flex-col justify-between w-full">
            {dropdownListData.map(({ title }) => {
              return (
                <li
                  key={title}
                  onClick={() => setActiveCategory(title)}
                  className="flex gap-x-2 hover:bg-blue-300 mb-3 px-3 py-1 rounded-md transition-all duration-300  capitalize"
                >
                  <span className="text-xs">{title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDrodown;
