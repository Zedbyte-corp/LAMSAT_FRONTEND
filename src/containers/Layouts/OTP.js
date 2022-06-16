import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { Form, Input, Button, Select } from "antd";

const OTP = (props) => {
  const { OTPdata, onChangeOTP } = props;
  const [otp, setOtp] = useState();

  return (
    <div>
      <OTPInput
        value={OTPdata}
        onChange={onChangeOTP}
        autoFocus
        OTPLength={5}
        otpType="string / number"
        disabled={false}
        inputStyles={{ width: 40, height: 40, marginRight: 2 }}
        className="customOTPbox"
      />
    </div>
  );
};

export default OTP;
