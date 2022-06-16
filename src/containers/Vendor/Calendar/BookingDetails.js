import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import moment from "moment";
import { store } from "redux/store";
import actions from "redux/admin/bookingManagement/actions";
import { useSelector } from "react-redux";

const { Option } = Select;

export default function BookingDetails(props) {
  const { bookingId } = props;
  const [bookingDetails, setBookingDetails] = useState(null);
  const { booking, loading } = useSelector((state) => state.Booking);
  const [bookingLoading, setbookingLoading] = useState(false);
  // console.log("this is the value of the booking details", bookingDetails);
  // console.log("bbbbbbbbbbbbb", bookingId);

  useEffect(() => {
    // console.log("bookingId 500: " + bookingId);
    if (bookingId != 0) {
      // console.log("bookingId 5000: " + bookingId);
      setbookingLoading(true);
      store.dispatch({
        type: actions.GET_BOOKING,
        id: bookingId,
        callBackAction: (status) => {
          setbookingLoading(false);
          //console.log(status)
          // setloaderbyID(false);
          // console.log("status!!!!", status);
        },
      });
    }
  }, [bookingId]);

  useEffect(() => {
    // console.log("bookingId 2: " + JSON.stringify(booking));
    setBookingDetails(booking);
  }, [booking]);

  // console.log("eeeeeee bookingDetails: " + JSON.stringify(bookingDetails));
  // console.log("eeeee eventInfo: " + bookingId);

  function handleChange(value) {
    var dataSave = {
      id: bookingDetails.id,
      status: value,
      email: bookingDetails.customerdetails.email,
      name: bookingDetails.customerdetails.firstname,
    };
    store.dispatch({
      type: actions.UPDATE_VENDOR_BOOKING_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        store.dispatch({
          type: actions.GET_BOOKING_LIST,
        });
      },
    });
  }

  function handlePaymentStatusChange(value) {
    setbookingLoading(true);
    var dataSave = {
      id: bookingDetails.id,
      payment_status: parseInt(value),
    };
    store.dispatch({
      type: actions.UPDATE_VENDOR_PAYMENT_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        setbookingLoading(false);
      },
    });
  }

  return (
    <>
      {bookingDetails && bookingDetails.vendor_details ? (
        <Spin size="large" spinning={bookingLoading}>
          <div className="booking_details_content">
            {/* {console.log("&&&&&&&&&&&&&&&&&", bookingDetails)} */}
            {/* {console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", booking)} */}
            <p>
              <span className="leftside">Booking No : </span>
              <span className="right">{`${bookingDetails.bookingno}`}</span>
            </p>
            <p>
              <span className="leftside">Saloon : </span>
              <span className="right">
                {`${bookingDetails.vendor_details.language["vendorname"]}`}
              </span>
            </p>
            <p>
              <span className="leftside">Price : </span>
              <span className="right">
                {`${bookingDetails.actualrate}`} SAR
              </span>
            </p>
            <p>
              <span className="leftside">Sub Total :</span>{" "}
              <span className="right">{`${bookingDetails.subtotal}`} SAR</span>
            </p>
            <p>
              <span className="leftside">VAT % :</span>{" "}
              <span className="right">
                {`${bookingDetails.vat_percent ? bookingDetails.vat_percent :0}`} 
              </span>
            </p>
            <p>
              <span className="leftside">VAT Amount :</span>{" "}
              <span className="right">
                {`${bookingDetails.vat_amount}`} SAR
              </span>
            </p>
            <p>
              <span className="leftside">Total :</span>{" "}
              <span className="right">{`${bookingDetails.totalcost}`} SAR</span>
            </p>
            {/* <p>
              <span className="leftside">VAT % :</span>{" "}
              <span className="right">{`${bookingDetails.vat_percent}`}</span>
            </p> */}

            <p>
              <span className="leftside">Payment Method :</span>{" "}
              {/* <span className="right">{`${bookingDetails.payment_method}`}</span> */}
              <span className="right">Online</span>
            </p>

            <p>
              <span className="leftside">Voucher Code :</span>{" "}
              <span className="right">
                {`${bookingDetails.voucher_code}` !== null &&
                `${bookingDetails.voucher_code}` !== "null"
                  ? `${bookingDetails.voucher_code}`
                  : ""}
              </span>
            </p>
            <h5>Customer Details</h5>
            <p>
              <span className="leftside">Name :</span>
              <span className="right">{`${bookingDetails.customerdetails.firstname}${bookingDetails.customerdetails.lastname}`}</span>
            </p>
            <p>
              <span className="leftside">Email :</span>
              <span className="right">{`${bookingDetails.customerdetails.email}`}</span>
            </p>
            <p>
              <span className="leftside">Contact No :</span>
              <span className="right">{`${bookingDetails.customerdetails.contactnumber}`}</span>
            </p>

            <p>
              <span className="leftside">Status :</span>{" "}
              <span className="right">
                {/* <Select
                                    defaultValue={`${bookingDetails.booking_status}`}
                                    style={{ width: 120 }}

                                >
                                    <Option value="3">Pending</Option>
                                    <Option value="1">Accept</Option>
                                    <Option value="2">Reject</Option>
                                    <Option value="4">Completed</Option>
                                </Select> */}
                Accept
              </span>
            </p>
            <p>
              <span className="leftside">Payment Status :</span>{" "}
              <span className="right">
                <Select
                  defaultValue={`${bookingDetails.payment_status}`}
                  style={{ width: 120 }}
                  onChange={(value, event) => handlePaymentStatusChange(value)}
                >
                  <Option value="0">Refund</Option>
                  <Option value="1">Paid</Option>
                  {/* <Option value="2">Failed</Option> */}
                </Select>
              </span>
            </p>

            <h5>Service Details</h5>
            {bookingDetails.newservice_details.map((servic_key, servic_index) => {
              /* return ('Date :'+`${servic_key.service_date}`+'{<br/>}***Service Name : '+`${servic_key.service_details[0].language.servicename}` )*/
              return (
                <>            
                  <p>
                    <span className="leftside">Appointment:</span>{" "}
                    <span className="right">
                      {`${bookingDetails.service_date}` +
                        " & " +
                        `${servic_key.service_time ?
                          moment(servic_key.service_time).utc(false).format("hh:mm A")
                          : ""
                        }` 
                      }
                    </span>
                  </p>
            {/* {bookingDetails.service_details.map((servic_key, servic_index) => {
              /* return ('Date :'+`${servic_key.service_date}`+'{<br/>}***Service Name : '+`${servic_key.service_details[0].language.servicename}` )/
              return (
                <> */}
                  <p>
                    <span className="leftside">Service Name :</span>{" "}
                    <span className="right">
                      {" "}
                      {`${servic_key.service_details[0].language.servicename}`}
                    </span>
                  </p>
                  <p>
                    <span className="leftside">Staff Name: </span>
                    <span className="right">{`${
                      servic_key.staffname
                        ? servic_key.staffname
                        : ""
                    }`}</span>
                  </p>
                  {/* <p>
                    <span className="leftside">
                      Price
                      {/* &amp; Special Price : *}
                    </span>{" "}
                    {/* <span className="right">{`${servic_key.price[0].price}  SAR & ${servic_key.price[0].special_price} SAR`}</span> *}
                    <span className="right">{`${servic_key.price[0].price}  SAR `}</span>
                  </p> */}
                </>
              );
            })}
          </div>
        </Spin>
      ) : (
        <>
          <p> Please wait... </p>
        </>
      )}
    </>
  );
}
