import React from "react";
import Link from "next/link";

interface Market {
    market: string
    division: string
    min: number
    max: number
}

interface Product {
    id: number
    slug: string
    nameBn: string
    category: string
    categoryNameBn: string
    categoryIcon: string
    unit: string
    image: string
    today: number
    yesterday: number
    lastWeek: number
    lastMonth: number
    change: {
        dir: string
        pct: number
    }
    markets: Market[]
}

const ProductDetails = async ({ params }: {params: Promise<{ id: string }>}) => {
    const { id } = await params;
    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: Product[] = await response.json();

    const product = data.find(
        (item) => item.id === Number(id))
    if (!product) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-7xl font-bold text-green-700">404</h1>
            <h2 className="text-2xl font-bold mt-4">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
            <Link href="/"
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:bg-[#2d6a4f] cursor-pointer">
                হোম পেজে ফিরে যান
            </Link>
        </div>
        )
    }
    const lowestPrice = Math.min
    (...product.markets.map((market) => market.min))
    const highestPrice = Math.max
    (...product.markets.map((market) => market.max))

    const averagePrice =
        product.markets.reduce(
            (total, market) =>
                total + (market.min + market.max) / 2, 0) / product.markets.length;
    return (
        <div className="min-h-screen bg-[#f3f7f3] p-6 md:p-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8">
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-[#f3f7f3] rounded-2xl flex items-center justify-center text-4xl">
                            {product.image}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {product.nameBn}
                            </h1>
                            <p className="text-sm text-gray-600">
                                প্রতি {product.unit === "kg"
                                    ? "কেজি"
                                    : product.unit === "litre"
                                        ? "লিটার"
                                        : product.unit === "piece"
                                            ? "পিস"
                                            : product.unit}
                                {" ・ "}
                                {product.categoryNameBn}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                গতকালের তুলনায় আজ দাম{" "}
                                {product.change.dir === "up"
                                    ? "বেড়েছে"
                                    : product.change.dir === "down"
                                        ? "কমেছে"
                                        : "অপরিবর্তিত"}
                                {" ・ "}
                                {Math.abs(product.change.pct).toLocaleString("bn-BD")}
                                {"%"}
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:block bg-[#f3f7f3] rounded-2xl px-6 py-4 text-right">
                        <p className="text-sm text-gray-500"> আজকের দাম</p>
                        <p className="text-3xl font-extrabold">
                            {product.today.toLocaleString("bn-BD")}
                        </p>
                        <p className="text-sm text-gray-500">
                            টাকা / {product.unit === "kg"
                                ? "কেজি"
                                : product.unit}
                        </p>
                        <p className={product.change.dir === "up"
                                    ? "text-red-600 text-sm font-bold"
                                    : "text-green-600 text-sm font-bold"
                            }>
                            {product.change.dir === "up" ? "▲" : "▼"}{" "}
                            {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="font-bold text-lg mb-3">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-green-600">
                            {lowestPrice.toLocaleString("bn-BD")} টাকা
                        </p>
                        <p className="text-xs text-gray-500 mt-1">সবচেয়ে কম দামের বাজার</p>

                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
                        <p className="text-2xl font-bold text-red-600">
                            {highestPrice.toLocaleString("bn-BD")} টাকা
                        </p>

                        <p className="text-xs text-gray-500 mt-1">সবচেয়ে বেশি দামের বাজার</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-600">গড় দাম</p>
                        <p className="text-2xl font-bold text-green-600">
                            {Math.round(averagePrice).toLocaleString("bn-BD")} টাকা
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            প্রতি {product.unit === "kg"
                                ? "কেজি"
                                : product.unit} হিসেবে
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="font-extrabold text-lg mb-3">বাজারভিত্তিক আজকের দাম</h2>
                <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#f3f7f3]">
                                <tr className="border-b border-gray-200">
                                    <th className="text-left p-4 font-extrabold text-gray-600">
                                        বাজার
                                    </th>
                                    <th className="text-left p-4 font-extrabold text-gray-600">
                                        বিভাগ
                                    </th>
                                    <th className="text-right p-4 font-extrabold text-gray-600">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="text-right p-4 font-extrabold text-gray-600">
                                        সর্বাধিক
                                    </th>
                                    <th className="text-right p-4 font-extrabold text-gray-600">
                                        গড়
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.markets.map((market, index) => {
                                    const marketAverage = (market.min + market.max) / 2;
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-700 last:border-b-0">
                                            <td className="p-4 font-semibold">
                                                {market.market}
                                            </td>
                                            <td className="p-4">
                                                {market.division}
                                            </td>
                                            <td className="p-4 text-right">
                                                {market.min.toLocaleString("bn-BD")} টাকা
                                            </td>
                                            <td className="p-4 text-right">
                                                {market.max.toLocaleString("bn-BD")} টাকা
                                            </td>
                                            <td className="p-4 text-right font-semibold">
                                                {Math.round(marketAverage).toLocaleString("bn-BD")} টাকা
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;