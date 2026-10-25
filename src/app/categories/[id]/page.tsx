import SortedProducts from '@/components/Price Cards/SortedProducts';


interface Product {
    id: number;
    image: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    today: number;
    unit: string;
    change: {
        dir: string;
        pct: number;
    };
}

interface Category {
    id: string
    slug: string
    nameBn: string
    icon: string
}

const CategoryProducts = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const categoryResponse = await fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${id}`)
    const category: Category = await categoryResponse.json();

    const productsResponse = await fetch('https://openapi.programming-hero.com/api/bazardor/products')
    const allProducts: Product[] = await productsResponse.json();
    const products = allProducts.filter(
        (product) => product.category === id)


    return (
        <div>
            <div className='p-8'>
                <div className="flex items-center gap-2 p-5 bg-white border border-gray-300 rounded-xl">
                    <div className="w-12 h-12 bg-[#f3f7f3] rounded-2xl flex items-center justify-center text-4xl">
                        {category.icon}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">
                            {category.nameBn}
                        </h2>
                        <p className="text-sm text-gray-600">
                            মোট{" "}
                            {products.length.toLocaleString("bn-BD")}
                            টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>
            </div>
                <div>
                    <SortedProducts products={products} />
                </div>
        </div>
    )
}

export default CategoryProducts;