import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import {
  createPaymentOrder,
  verifyPayment,
} from "../features/payment/paymentSlice";

const PaymentButton = ({ appointmentId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
    
      const order = await dispatch(
        createPaymentOrder( {appointmentId} )
      ).unwrap();

      const options = {
        key: order.key,
        amount: order.amount,
        currency: "INR",
        name: "Healthplus",
        description: "Doctor Consultation Fee",
        handler: function (response) {
          dispatch(
            verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId,
            })
          );
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0f766e",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
        bg-gradient-to-r from-teal-600 to-emerald-600
        hover:from-teal-700 hover:to-emerald-700
        transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Payment
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay Consultation Fee
          </>
        )}
      </button>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-teal-600" />
        Secure payment • Encrypted gateway
      </div>
    </div>
  );
};

export default PaymentButton;
