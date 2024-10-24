import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <>
      {breadcrumbs.map((breadcrumb, index) => (
        <li
          key={index}
          className="flex items-center text-sm font-medium text-slate-800 text-opacity-70 "
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
