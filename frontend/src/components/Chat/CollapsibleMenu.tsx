import React, { useState } from 'react';

const CollapsibleMenu = (props:any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
        className={`${props.className}`} 
        onClick={toggleMenu}
    >
      {props.content}
      {isOpen && (
        <div className={`${props.menuClassName}`}>
          {/* Menu content */}
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100">Item 1</li>
            <li className="px-4 py-2 hover:bg-gray-100">Item 2</li>
            <li className="px-4 py-2 hover:bg-gray-100">Item 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollapsibleMenu;