export function LoginForm() {
  return (
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
  );
}
