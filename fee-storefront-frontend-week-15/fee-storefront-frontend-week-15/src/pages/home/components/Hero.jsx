import { createCategory } from "../../../services/api/product";

function Hero() {
  return (
    <section className="py-8 px-16">
      <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f2edf2]">
        <div className="flex flex-col justify-center p-16 gap-y-4">
          <span className="block rounded-full px-2 py-1 text-xs  w-fit bg-[#febc26]">
            WEEKLY DISCOUNT
          </span>
          <h1 className="text-6xl font-semibold">
          Elite Online Marketplace for Premium Items
          </h1>
          <p>
          Elevate Your Digital Lifestyle with Our Premium Accessories. Explore our range today and elevate your tech setup
          </p>
          <a
            to="/shop"
            className="px-4 py-2 text-white font-medium bg-black rounded w-fit"
          >
            Shop Now
          </a>
          {/* <button className="border border-red-500 w-fit p-2" onClick={async () => createCategory()}>
            Test Create Category
          </button> */}
        </div>
        <div className=" relative">
          <img
            src="/public/assets/hero/hi3.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
