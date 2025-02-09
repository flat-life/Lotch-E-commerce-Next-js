import { Product } from "@/lib/products";

const FeaturesImage = ({ product }: { product: Product }) => {
  return (
    <>
      <div className=" w-1/2  p-4">
        <div className=" bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/03_10bar.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">10 bar water resistant</h1>
        </div>
      </div>
      <div className=" w-1/2  p-4">
        <div className=" bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/58_collaboration.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">Collaboration model</h1>
        </div>
      </div>
      <div className=" w-1/2  p-4">
        <div className=" bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/22_ligth_strong.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">Light and strong</h1>
        </div>
      </div>
      <div className=" w-1/2  p-4">
        <div className=" bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/46_tough_mat.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">Extra tough band</h1>
        </div>
      </div>
      <div className=" w-1/2  p-4">
        <div className=" bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/55_sporty.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">Sporty design</h1>
        </div>
      </div>
      <div className=" w-1/2  p-4">
        <div className=" bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/57_limited.png"
            alt={product.title}
            className="w-full object-cover h-full"
          />
          <h1 className="text-md font-extrabold">Limited model</h1>
        </div>
      </div>
    </>
  );
};
export default FeaturesImage;
