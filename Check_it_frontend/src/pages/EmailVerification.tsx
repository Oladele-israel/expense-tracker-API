const EmailVerification = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 h-screen flex flex-col justify-center  ">
      <div className="flex flex-col items-center bg-slate-100 w-[80vw] md:w-[60vw] lg:w-[40vw] rounded-lg shadow-md ml-auto mr-auto p-5">
        <div className="mb-10 text-3xl font-semibold text-blue-600">logoX</div>
        <div className="text-2xl capitalize font-semibold mb-10">
          Verify Your Email
        </div>
        <div className="text-center text-slate-800 text-sm md:text-lg mb-10">
          We've sent a link to your email ter4@example.com. Please follow the
          link inside to continue
        </div>
        <div className="capitalize text-slate-800">
          Didn't receive an <span className="font-bold">email?</span>
        </div>
        <button className="bg-blue-700 mt-4 p-2 w-full rounded-md text-white hover:bg-blue-950">
          Resend Link
        </button>
      </div>
    </section>
  );
};

export default EmailVerification;
