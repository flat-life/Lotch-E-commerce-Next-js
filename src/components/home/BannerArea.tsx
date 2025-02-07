import Image from "next/image";

const BannerArea = () => {
  return (
    <div className="relative w-full">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <Image
            src="/banner/multicolor-hero-pc-m.avif"
            alt="Slide 1"
            width={1920}
            height={800}
            priority
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide14" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <Image
            src="/banner/ecb-40-hero-pc.avif"
            alt="Slide 2"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <Image
            src="/banner/ecb-2000-hero-pc-m.avif"
            alt="Slide 3"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide4" className="carousel-item relative w-full">
          <Image
            src="/banner/ecb-2200-hero-pc-m.avif"
            alt="Slide 4"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide5" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide5" className="carousel-item relative w-full">
          <Image
            src="/banner/ecb-2200htr-hero-pc.webp"
            alt="Slide 5"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide6" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide6" className="carousel-item relative w-full">
          <Image
            src="/banner/efr-s108-hero-pc-en.avif"
            alt="Slide 6"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide5" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide7" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide7" className="carousel-item relative w-full">
          <Image
            src="/banner/eqb-2000-hero-pc.avif"
            alt="Slide 7"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide6" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide8" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide8" className="carousel-item relative w-full">
          <Image
            src="/banner/eqs-960-hero-pc.avif"
            alt="Slide 8"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide7" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide9" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide9" className="carousel-item relative w-full">
          <Image
            src="/banner/kv-en.avif"
            alt="Slide 9"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide8" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide10" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide10" className="carousel-item relative w-full">
          <Image
            src="/banner/kv.avif"
            alt="Slide 10"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide9" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide11" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide11" className="carousel-item relative w-full">
          <Image
            src="/banner/kv.webp"
            alt="Slide 11"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide10" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide12" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide12" className="carousel-item relative w-full">
          <Image
            src="/banner/automotive-hero-pc.avif"
            alt="Slide 12"
            width={1920}
            height={800}
            className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide11" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerArea;
