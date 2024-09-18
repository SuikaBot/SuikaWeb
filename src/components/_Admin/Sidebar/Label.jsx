const Label = (props) => {
  return (
    <div className="font-semibold text-sm">
      {/* {data.role === "pemilik" ? "Kelola Users" : "Kelola Data"} */}
      <p>{props.name}</p>
    </div>
  );
};

export default Label;
