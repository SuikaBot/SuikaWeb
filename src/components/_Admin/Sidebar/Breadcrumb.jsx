import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breadcrumb = ({ breadcrumbs }) => {
  //   if (breadcrumbs.length <= 1) return null;
  return (
    <>
      {breadcrumbs.map((breadcrumb, index) => (
        <li
          key={index}
          className="flex items-center text-sm text-gray-800 dark:text-neutral-400"
        >
          <p className="capitalize">{breadcrumb}</p>
          {index < breadcrumbs.length - 1 && (
            <FontAwesomeIcon
              className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
              icon="fa-solid fa-chevron-right"
            />
          )}
        </li>
      ))}
    </>
  );
};

export default Breadcrumb;
