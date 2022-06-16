// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { history, store } from "redux/store";
// import actions from "redux/auth/actions";

// export default function MyInterviewWidget({ checkoutId }) {
//   const script = document.createElement("script");
//   script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
//   script.async = true;
//   script.defer = true;
//   document.body.appendChild(script);
//   script.onload = () => {
//     var myInterviewRecorder = new MyInterviewWidget({
//       container: "#mycustom-container", // querySelector to the element that will contain the widget
//       config: {
//         apiKey: "TCeni10RVWO0jEJHN3uF",
//       },
//     });
//   };

//   return (
//     <form
//       action="https://hyperpay.docs.oppwa.com/tutorials/integration-guide"
//       class="paymentWidgets"
//       id="mycustom-container"
//       data-brands="VISA MASTER AMEX"
//     ></form>
//   );
// }

import React, { useEffect, useState } from "react";
class MyInterviewWidget extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "this is the value of the props",
      props,
      localStorage.getItem("confirmbookingid")
    );
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${this.props.checkoutId}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      var myInterviewRecorder = new MyInterviewWidget({
        container: "#mycustom-container", // querySelector to the element that will contain the widget
        style: "plain",
        config: {
          apiKey: "TCeni10RVWO0jEJHN3uF",
        },
      });
    };
  }
  render() {
    return (
      <>
        <form
          action={`/confirmation`}
          class="paymentWidgets"
          id="mycustom-container"
          data-brands="VISA MASTER"
        >
          <div id="mycustom-container"> </div>
        </form>
      </>
    );
  }
}

export default MyInterviewWidget;
