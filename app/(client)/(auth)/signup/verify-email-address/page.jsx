"use client";
import { UserCircle, NotePencil, Warning } from "phosphor-react";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/config";
import { useSearchParams } from "next/navigation";
export default function VerifyEmailAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url");
  const [otp, setOtp] = useState("");
  const [verificationError, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useStore();
  useEffect(() => {
    if (user == null) router.push("/signup");
  }, []);
  async function handleVerification() {
    setLoading(true);
    setError();
    const email = user.email;
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });
    if (error) {
      setLoading(false);
      setError(error.message);
      console.log("Error in verifying otp", error.message);
    } else {
      setLoading(false);
      setError();
      setUser(data.user);
      if (callback_url) router.push(callback_url);
      else router.push("/");
    }
  }
  return (
    user && (
      <main className="box-content flex flex-col items-center justify-center min-h-screen text-black font-poppins dark:text-white">
        <div
          className={`${
            loading && "pointer-events-none opacity-50"
          } p-4 bg-white w-[90%] max-w-[400px] dark:bg-black dark:shadow-md dark:border dark:border-gray-100 dark:shadow-gray-200 flex flex-col gap-8 md:w-[400px] shadow-md rounded-2xl`}
        >
          <div>
            <h2 className="text-3xl font-semibold">Verify your email</h2>
            <span className="text-sm text-gray-600 dark:text-white">
              to continue to Logger
            </span>
          </div>
          <div className="flex items-center w-[320px] overflow-hidden gap-1 p-1 border justify-center rounded-full ">
            <UserCircle size={25} color="#808080" weight="bold" />
            <span className="text-sm w-[80%] dark:text-gray-100 overflow-hidden text-gray-500">
              {user.email}
            </span>
            <a href="/signup">
              <NotePencil size={25} color="#3944bc" weight="bold" />
            </a>
          </div>
          <div>
            <h2 className="text-lg font-semibold ">Verification code</h2>
            <span className="text-[0.9rem] text-gray-600 dark:text-white">
              Enter the verification code sent to your email address
            </span>
          </div>
          <div className="m-auto">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus={true}
              renderSeparator={<span>&nbsp; - &nbsp; </span>}
              renderInput={(props) => <input {...props} />}
              containerStyle=""
              inputStyle="border mt-1 mb-2 outline-none resize-none dark:text-black border-gray-300 rounded-sm"
            />
          </div>
          {verificationError && (
            <div className="flex items-center justify-center gap-2 mt-4 text-center">
              <Warning size={32} color="#7da239" weight="bold" />
              {verificationError}
            </div>
          )}
          <div className="text-center">
            <button
              disabled={loading}
              onClick={handleVerification}
              className="w-full p-2 font-semibold text-white bg-blue-600 rounded-md"
            >
              Verify
            </button>
          </div>
        </div>
      </main>
    )
  );
}
