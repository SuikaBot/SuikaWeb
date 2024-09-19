import DataTableBase from "../DataTableBase";

const DataTableMain = ({ columns, data, searchText, onSearch, ...props }) => {
  const filteredData = data.filter((item) =>
    columns.some(
      (col) =>
        typeof col.selector === "function" &&
        col
          .selector(item)
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={onSearch}
        className="mb-4 px-3 py-2 border rounded"
      />
      <DataTableBase columns={columns} data={filteredData} {...props} />
    </div>
  );
};

export default DataTableMain;
