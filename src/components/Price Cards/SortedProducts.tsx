"use client"
import { Label, ListBox, Select } from "@heroui/react";
import { useState } from 'react';
import Cards from './Cards';

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
const SortedProducts = ({ products }: { products: Product[] }) => {
    const [sortOrder, setSortOrder] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low-high") {
            return a.today - b.today;
        }
        if (sortOrder === "high-low") {
            return b.today - a.today;
        }
        return 0;
    })
    const itemClass = "rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:text-foreground";

    return (
        <div >
            <div className="className= px-8 md:px-8">
                <div className="rounded-xl border border-[#dce5de] bg-[#fafcf9] px-6 py-6">
                    <div className="flex justify-end gap-2">
                        <Select
                            className="w-56 flex flex-row gap-3"
                            placeholder="ডিফল্ট"
                            variant="secondary"
                            selectedKey={sortOrder}
                            onSelectionChange={(key) =>
                                setSortOrder(key?.toString() ?? "default")}>
                            <Label className="font-medium flex items-center justify-center text-foreground">
                                সাজান
                            </Label>
                            <Select.Trigger className="rounded-xl bg-default">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="rounded-xl border border-border bg-surface p-1 shadow-lg">
                                <ListBox>
                                    <ListBox.Item
                                        id="default"
                                        textValue="ডিফল্ট"
                                        className={itemClass}>
                                        ডিফল্ট
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item
                                        id="low-high"
                                        textValue="দাম: কম থেকে বেশি"
                                        className={itemClass}>
                                        দাম: কম থেকে বেশি
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item
                                        id="high-low"
                                        textValue="দাম: বেশি থেকে কম"
                                        className={itemClass}>
                                        দাম: বেশি থেকে কম
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="px-8 mt-6">
                <p className="text-gray-600">
                    মোট{" "}
                    {sortedProducts.length.toLocaleString("bn-BD")}
                    টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="px-8 py-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <Cards key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default SortedProducts;