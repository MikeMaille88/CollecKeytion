//navbar.jsx
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const navigation = [
  { name: "Mes Clefs", href: "/mykeys", current: false },
  { name: "Toutes les Clefs", href: "/allKeys", current: false },
  {
    name: "Lands",
    current: false,
    sublinks: [
      { name: "Fantasyland", href: "/land/Fantasyland" },
      { name: "Adventureland", href: "/land/Adventureland" },
      { name: "Discoveryland", href: "/land/Discoveryland" },
      { name: "Frontierland", href: "/land/Frontierland" },
      { name: "Main Street USA", href: "/land/MSU" },
      { name: "Walt Disney Studios", href: "/land/WDS" },
      { name: "Disney Village et Hotels", href: "/land/DVH" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const userId = localStorage.getItem("authId");
  const [isAdmin, setIsAdmin] = useState(false);
  const [landMenuOpen, setLandMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "/Images/Avatars/avatar_default.jpg"
  );

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`${apiUrl}users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setAvatarUrl(data.avatar || "/Images/Avatars/avatar_default.jpg");
          setIsAdmin(data.admin || false);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
      }
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/Images/CollecKeytion_Logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="flex flex-shrink-0 items-center text-white text-xl">
                  <p>
                    <a href="/">CollecKeytion</a>
                  </p>
                </div>
                <div className="hidden sm:ml-6 sm:block z-50">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div key={item.name} className="relative">
                        {item.sublinks ? (
                          <>
                            <Menu>
                              <button
                                onClick={() => setLandMenuOpen(!landMenuOpen)}
                                className={classNames(
                                  "group rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                )}
                              >
                                {item.name}
                              </button>

                              <Transition
                                show={landMenuOpen}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <div className="py-1">
                                    {item.sublinks.map((sublink) => (
                                      <Menu.Item key={sublink.name}>
                                        {({ active }) => (
                                          <Link
                                            to={sublink.href}
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                            onClick={() =>
                                              setLandMenuOpen(false)
                                            } // Ajoutez ceci pour fermer le menu
                                          >
                                            {sublink.name}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </>
                        ) : (
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium flex items-center"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatarUrl}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Profil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Paramètres
                          </Link>
                        )}
                      </Menu.Item>

                      {isAdmin && ( // Afficher ce lien uniquement si l'utilisateur est admin
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/adminpage"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Admin
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/login"
                            onClick={() => {
                              localStorage.removeItem("authToken");
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Déconnexion
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
