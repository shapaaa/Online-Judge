const Result = ({ output, verdict }) => {
  return <div>{!!output ? output : !!verdict ? verdict : ""}</div>;
};

export default Result;
