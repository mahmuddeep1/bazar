import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headlines {
    id: string,
    image: string,
    nameBn: string,
    today: number
    change: {
        dir: string
        pct: number
    }
}

const Marquee = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: Headlines[] = await response.json()
    
    return (
        <div className="relative z-0 w-full">
            <div className="flex max-w-7xl mx-auto border-b border-gray-200 overflow-hidden">
                <MarqueeText className="py-1" direction="right" duration={10}>
                    {data.map((h) => (
                        <div className="flex items-center gap-2 px-4 py-1.5 border-r border-gray-200 whitespace-nowrap text-sm" key={h.id}>
                            <span className="text-base">{h.image}</span>
                            <span className="text-gray-700 font-bold">{h.nameBn}</span>
                            <span className="text-gray-800">{h.today.toLocaleString("bn-BD")} টাকা/কেজি</span>
                            <span className={
                                    h.change.dir === "up"
                                        ? "text-green-600 font-semibold"
                                        : "text-red-600 font-semibold"
                                }>
                                {h.change.dir === "up" ? "▲" : "▼"}{" "}
                                {h.change.pct.toLocaleString("bn-BD")}%
                            </span>
                        </div>
                    ))}

                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;