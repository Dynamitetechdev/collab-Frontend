import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex flex-col md:items-center">
      <div className="text-left md:text-center mt-16 md:mt-28">
        <h1 className="text-4xl max-[600px]:mx-5  md:text-7xl font-bold">
          Your new spreedsheet <br /> for working with teams in real time
        </h1>
        <p className="my-4 md:my-6 text-1xl  md:text-2xl text-gray-500  max-[600px]:mx-5">
          Collaborate 10x faster with share data on spreedsheet, and view them
          real time.
        </p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white text-1xl max-[600px]:w-8/12 max-[600px]:mx-5 font-bold py-2 px-8 rounded text-center">
        Create an account
      </button>
      <div className="main-img mt-5">
        <Image src={"/assets/data-bg.png"} width={900} height={900} alt="" />
      </div>
    </div>
  );
};

export default HomePage;
