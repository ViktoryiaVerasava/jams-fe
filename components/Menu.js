import { FiMenu } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { useState } from "react";

import styles from "../styles/Menu.module.css";
import MenuItem from "./MenuItem";

const menuConfig = [
  { id:0, label: "Jams", content: "/jams" },
  { id:1, label: "Create new jam", content: "/songs" },
  { id:2, label: "My info", content: "/me" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {" "}
      {isOpen ? (
        <div className={styles.container}>
          {menuConfig.map((menuItemConfig) => (
            <MenuItem key={menuItemConfig.id} config={menuItemConfig} closeMenu={()=>setIsOpen(false)}/>
          ))}
          <IoIosCloseCircleOutline
            onClick={() => setIsOpen(false)}
            className={styles.icon}
          />
        </div>
      ) : (
        <FiMenu onClick={() => setIsOpen(true)} className={styles.icon} />
      )}
    </>
  );
};

export default Menu;
