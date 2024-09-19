import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";

const ActionsMenu = ({ onEdit, onDelete, hidden }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="p-2 text-gray-500 hover:text-gray-700">
      <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items className="absolute right-7 bottom-0 w-32 origin-top-right z-10 bg-color1 divide-y divide-gray-100 rounded-md shadow-lg ring-2 ring-color4 ring-opacity-5 focus:outline-none px-1 py-1">
        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <>
                <Button
                  size="xs"
                  className={`${
                    active
                      ? "bg-warning-hover text-color4"
                      : "bg-warning text-color4"
                  } group flex justify-start w-full text-sm mb-1`}
                  onClick={() => onEdit()}
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                  </span>
                  Edit
                </Button>
              </>
            )}
          </Menu.Item>
          <Menu.Item className={hidden}>
            {({ active }) => (
              <Button
                size="xs"
                onClick={onDelete}
                className={`${
                  active
                    ? "bg-danger-hover text-color1"
                    : "bg-danger text-color1"
                } group flex justify-start w-full text-sm`}
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon="fa-regular fa-trash-can" />
                </span>
                Delete
              </Button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default ActionsMenu;
