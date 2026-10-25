const Loading = () => {
    return (
        <div className="animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-5 bg-gray-200 rounded mt-4 w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded mt-3 w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded mt-4 w-full"></div>
        </div>
    );
};

export default Loading;