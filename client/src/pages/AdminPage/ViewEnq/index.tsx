import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../../../components/Meta";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getAEnquiry, resetState, updateEnquiry } from "../../../features/enquiry/enquirySlice";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";

interface EnquiryProps {}

const ViewEnq: React.FC<EnquiryProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEndId = location.pathname.split("/")[3];
  const { enqName, enqComment, enqPhone, enqEmail, enqStatus } = useSelector(
    (state: RootState) => state.enquiry
  );

  useEffect(() => {
    dispatch(getAEnquiry(getEndId));
  }, [dispatch]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e: any, id: string) => {
    const data = {
      id: id,
      enqData: e
    };

    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEndId));
    }, 100);
  };

  return (
    <>
      <Meta title={"View Enquiry"} />
      <div className="bg-transparent d-flex justify-content-between align-items-center">
        <h1 className="mb-4 title">View Enquiry</h1>
        <button
          className="mb-0 bg-transparent border-0 fs-4 d-flex align-items-center gap-1"
          onClick={handleGoBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 rounded-3 fs-4">
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 mt-2">Name: </h4>
          <p className="mb-0 mt-2">{enqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 mt-2">Phone: </h4>
          <p className="mb-0 mt-2">
            <a href={`tel:+${enqPhone}`}> {enqPhone}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 mt-2">Mail: </h4>
          <p className="mb-0 mt-2">
            <a href={`mailto:${enqEmail}`}> {enqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 mt-2">Comment: </h4>
          <p className="mb-0 mt-2">{enqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 mt-2">Status: </h4>
          <p className="mb-0 mt-2">{enqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 mt-2">Change Status: </h4>
          <div>
            <select
              name=""
              defaultValue={enqStatus ? enqStatus : "Submitted"}
              className="form-control form-select"
              onChange={e => setEnquiryStatus(e.target.value, getEndId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEnq;
