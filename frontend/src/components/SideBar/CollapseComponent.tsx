import { NavLink } from "react-router-dom";
import { Collapse } from "@mui/material";

interface Item {
  link: string;
  url: string;
}

interface CollapseComponentProps {
  state: boolean;
  list: Item[];
}

const CollapseComponent: React.FC<CollapseComponentProps> = ({
  state,
  list,
}) => {
  return (
    <Collapse in={state} timeout="auto" unmountOnExit>
      <div className="flex flex-col gap-2 py-2 pl-5">
        {list.map((item, index) => (
          <NavLink key={index} className="flex flex-col" to={item.url}>
            {item.link}
          </NavLink>
        ))}
      </div>
    </Collapse>
  );
};

export default CollapseComponent;
