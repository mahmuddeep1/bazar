import Hero from "@/components/hero/Hero";
import Cards from "@/components/Price Cards/Cards";

interface Product {
    id: number
    image: string
    nameBn: string
    today: number
    unit: string
    category: string
    change: {
        dir: string
        pct: number
    };
} 

export default async function Home () {
    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: Product[] = await response.json()
    const increasedProducts = data.filter((data) => data.change.dir === "up")
    const decreasedProducts = data.filter((data) => data.change.dir === "down")
  return (
    <div>
      <Hero />
      <div className="bg-[#f4f8f4] min-h-screen py-8">
            <section className="max-w-7xl mx-auto px-5 mt-8">
                <h1 className="text-2xl font-bold mb-6">
                    <span className="text-red-600 text-xl">▲</span>{" "}
                    আজ দাম বেড়েছে
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {increasedProducts.slice(0,6).map((product) => (
                        <Cards
                            key={product.id}
                            product={product}/>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5 mt-10">

                <h1 className="text-2xl font-bold mb-6">
                    <span className="text-green-600 text-xl">▼</span>{" "}
                    আজ দাম কমেছে
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {decreasedProducts.slice(0,6).map((product) => (
                        <Cards 
                            key={product.id}
                            product={product}/>
                    ))}
                </div>
            </section>

            <section id="cards" className="max-w-7xl mx-auto px-5 mt-10">

                <h1 className="text-2xl font-bold mb-2">
                    সব পণ্য
                </h1>
                <p className="text-gray-500 mb-6">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((product) => (
                        <Cards 
                            key={product.id}
                            product={product}/>
                    ))}
                </div>

            </section>
        </div>
    </div>

  );
}