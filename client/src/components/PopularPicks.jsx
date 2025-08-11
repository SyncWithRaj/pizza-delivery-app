import { FaStar, FaShoppingCart } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef, useEffect } from "react";

export default function PopularPicks({ popularItems, handleAddPopularToCart }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = 1; // pixels per frame
    let animationFrame;

    const smoothScroll = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0; // loop back to start
      } else {
        container.scrollLeft += scrollSpeed;
      }
      animationFrame = requestAnimationFrame(smoothScroll);
    };

    animationFrame = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="py-20 pt-32 px-6 max-w-6xl mx-auto relative">
      <h2 className="text-5xl font-bold mb-12 text-center flex justify-center items-center gap-2">
        <FaStar className="text-yellow-400" />
        Popular Picks
      </h2>

      {/* Left Scroll Button */}
      {/* <button
        onClick={() => scroll("left")}
        className="absolute -left-12 top-3/5 -translate-y-1/2 bg-gray-200 shadow-md p-3 rounded-full z-10 hover:bg-gray-300"
      >
        <FaChevronLeft />
      </button>
      
      <button
        onClick={() => scroll("right")}
        className="absolute -right-12 top-3/5 -translate-y-1/2 bg-gray-200 shadow-md p-3 rounded-full z-10 hover:bg-gray-300"
      >
        <FaChevronRight />
      </button> */}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {popularItems.concat(popularItems).map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 my-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
              <div className="flex items-center text-sm mb-2">
                <span className="text-yellow-500 flex items-center gap-1">
                  <FaStar /> {item.rating}
                </span>
                <span className="ml-auto font-bold">₹{item.price}</span>
              </div>
              <button
                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold flex justify-center items-center gap-2"
                onClick={() => handleAddPopularToCart(item)}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
