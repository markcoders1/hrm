import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// A function to convert UNIX timestamp to the day of the week (Mon, Tue, Wed, etc.)
const formatUnixTimestampToDay = (timestamp) => {
    const date = new Date(timestamp);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];  // Get day of the week from the date
};

// A function to convert duration from milliseconds to hours
const convertDurationToHours = (duration) => {
    return Math.round(duration / 3600000);  // Convert milliseconds to hours and round to nearest whole number
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`${label}`}</p>
                <p className="intro">{`Duration: ${value} hours`}</p>
            </div>
        );
    }
    return null;
};

const Chart = ({ graphData }) => {
    const [dynamicWidth, setDynamicWidth] = useState("100%");
    const [dynamicHeight, setDynamicHeight] = useState(400); // Default height

    const getAutomaticHeightAndWidth = () => {
        if (window.innerWidth <= 300) {
            setDynamicWidth(200);
        } else {
            setDynamicWidth("100%");
            setDynamicHeight("100%"); // You can set any default height here
        }

        if (window.innerWidth <= 500) {
            setDynamicHeight(350);
        }
    };

    useEffect(() => {
        getAutomaticHeightAndWidth(); // Set initial size
        window.addEventListener("resize", getAutomaticHeightAndWidth);
        return () => window.removeEventListener("resize", getAutomaticHeightAndWidth);
    }, []);

    // Format the data coming from the API
    const formattedData = graphData.map(item => ({
        date: formatUnixTimestampToDay(item.date),  // Convert UNIX timestamp to day of the week
        duration: convertDurationToHours(item.duration),  // Convert duration to hours
    }));

    return (
        <ResponsiveContainer width={dynamicWidth} height={dynamicHeight}>
            <AreaChart
                data={formattedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 8" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="duration" stroke="#3D0166" fillOpacity={0.1} fill="#EBDBF6" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default Chart;
