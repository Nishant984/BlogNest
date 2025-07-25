const StatCard = ({ label, value }) => {
    return (
        <div className="p-4 rounded-xl bg-[var(--secondary5)] shadow hover:shadow-lg transition duration-200">
            <h4 className="text-sm text-muted-foreground tracking-wide">{label}</h4>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
    );
};

export default StatCard;
