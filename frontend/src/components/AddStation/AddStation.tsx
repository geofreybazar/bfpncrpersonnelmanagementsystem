import { Link } from "react-router-dom";

const buttons = [
  { name: "Add Fire District", link: "/addstation/firedistrict" },
  { name: "Add City Fire Station", link: "/addstation/cityfirestation" },
  { name: "Add Fire Sub-Station", link: "/addstation/firesubstion" },
];

const AddStation = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col items-center gap-2 mb-10">
        <p className="text-3xl font-semibold">ADD FIRE STATION</p>
        <p className="italic">
          choose classification of fire station you wish to add
        </p>
      </div>
      <div className="w-2/6 flex flex-col items-center gap-6 ">
        {buttons.map((button) => (
          <Link key={button.name} className="w-full" to={button.link}>
            <button className="w-full bg-turquoise rounded-md p-2 font-semibold text-white text-2xl hover:bg-lightTurquoise hover:text-black">
              {button.name.toUpperCase()}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AddStation;
