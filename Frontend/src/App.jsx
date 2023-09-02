import "./App.css";

function App() {
  return (
    <main className="grid grid-cols-2  h-screen">
      <section className="px-[16rem] flex gap-3 flex-col justify-center ">
        <img src="/images/logo.svg" alt="Logo" className="w-14 h-14 mb-12" />
        <h1 className="font-semibold text-2xl">Masuk ke akun kamu</h1>
        <p className="text-[#4B5563] text-base font-normal self-stretch mb-8">
          Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang kamu
          cita-citata sejak dalam embrio!
        </p>
        {/* Another component */}
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-90"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2  text-sm font-semibold text-gray-90"
            >
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4  ounded focus:ring-3 focus:ring-blue-300 bg-[#F3F4F6] "
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium  dark:text-gray-300"
            >
              Ingat saya
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-[#4F46E5] font-medium rounded-lg text-sm w-full p-6 text-center "
          >
            Masuk
          </button>
        </form>
        <p className="mt-10 text-center">
          Belum punya akun?
          <span className="text-[#4F46E5]"> Daftar sekarang, gratis!</span>
        </p>
      </section>
      <section className="pb-[13rem] bg-right-side bg-center bg-no-repeat bg-cover flex flex-col-reverse items-center justify-between">
        <div className="max-w-xl gap-4">
          <p className="text-sm mb-4 text-white/60">NAMANYAJUGABELAJAR.IO</p>
          <p className="text-3xl text-white">
            Belajar secara online semakin mudah – tetep belajar walaupun pake
            kuota dari Kemendikbud hehe~
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
